import {streamClaude} from "@/lib/ai";
const SYSTEM="You are Lumio, a friendly AI study tutor for students. Explain simply, use examples, ask a short check-question at the end. If the student writes in Roman Urdu or Hindi, reply in the same style.";
export async function POST(req:Request){
  const {messages}=await req.json();
  if(!Array.isArray(messages)||!messages.length)return new Response("Bad request",{status:400});
  return streamClaude(SYSTEM,messages.slice(-20));
}
