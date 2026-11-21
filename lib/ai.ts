import {GoogleGenAI} from "@google/genai";
let _c:GoogleGenAI|null=null;
const getClient=()=>(_c??=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}));
// "gemini-flash-latest" always points to the current Flash model.
// If Google renames it, change GEMINI_MODEL in your env settings (see aistudio.google.com).
export const MODEL=process.env.GEMINI_MODEL||"gemini-flash-latest";
export function streamClaude(system:string,messages:{role:"user"|"assistant";content:string}[]){
  const enc=new TextEncoder();
  const body=new ReadableStream({async start(c){
    try{
      const stream=await getClient().models.generateContentStream({
        model:MODEL,
        contents:messages.map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content}]})),
        config:{systemInstruction:system,maxOutputTokens:2000}});
      for await(const chunk of stream){if(chunk.text)c.enqueue(enc.encode(chunk.text));}
    }catch{c.enqueue(enc.encode("\n\n[Error: could not reach the AI. Check GEMINI_API_KEY and the model name.]"));}
    c.close();}});
  return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8"}});
}
