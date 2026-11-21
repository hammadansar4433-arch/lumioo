import {GoogleGenAI} from "@google/genai";
let _c:GoogleGenAI|null=null;
const getClient=()=>(_c??=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}));
// Tries your main model first, then a lighter one if Google is busy.
const MODELS=[process.env.GEMINI_MODEL||"gemini-flash-latest","gemini-flash-lite-latest"];
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
export function streamClaude(system:string,messages:{role:"user"|"assistant";content:string}[]){
  const enc=new TextEncoder();
  const body=new ReadableStream({async start(c){
    let sent=false;let lastErr:any=null;
    try{
      if(!process.env.GEMINI_API_KEY)throw new Error("GEMINI_API_KEY is missing in Vercel settings (or you did not redeploy).");
      const contents=messages.map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content}]}));
      outer:for(let round=0;round<2;round++){
        for(const model of MODELS){
          try{
            const stream=await getClient().models.generateContentStream({model,contents,config:{systemInstruction:system,maxOutputTokens:2000}});
            for await(const chunk of stream){if(chunk.text){sent=true;c.enqueue(enc.encode(chunk.text));}}
            c.close();return;
          }catch(e){lastErr=e;if(sent)break outer;}
        }
        await sleep(1200);
      }
      throw lastErr;
    }catch(e:any){
      const m=String(e?.message||e);
      const busy=/503|UNAVAILABLE|429|quota|high demand/i.test(m);
      c.enqueue(enc.encode("\n\n["+(busy?"Google's free AI is busy right now. Please try again in a minute.":"Error: "+m.slice(0,300))+"]"));
    }
    c.close();}});
  return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8"}});
}
