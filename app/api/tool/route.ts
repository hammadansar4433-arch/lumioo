import {streamClaude} from "@/lib/ai";
import {TOOLS} from "@/lib/tools";
export async function POST(req:Request){
  const {slug,input}=await req.json();
  const tool=TOOLS.find(t=>t.slug===slug);
  if(!tool||typeof input!=="string"||!input.trim()||input.length>20000)return new Response("Bad request",{status:400});
  return streamClaude(tool.system,[{role:"user",content:input}]);
}
