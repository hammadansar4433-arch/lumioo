"use client";
import {useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {ArrowLeft,Wand2} from "lucide-react";
import {TOOLS} from "@/lib/tools";
import {readStream} from "@/lib/ai-client";
export default function ToolPage(){
  const {slug}=useParams<{slug:string}>();const tool=TOOLS.find(t=>t.slug===slug);
  const [input,setInput]=useState("");const [out,setOut]=useState("");const [busy,setBusy]=useState(false);
  if(!tool)return <p>Tool not found.</p>;
  async function run(){
    if(!input.trim()||busy)return;setBusy(true);setOut("");
    try{const res=await fetch("/api/tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug,input})});
      if(!res.ok||!res.body)throw new Error();await readStream(res,setOut);}
    catch{setOut("Something went wrong. Check your GEMINI_API_KEY.");}
    setBusy(false);}
  return(<div><Link href="/tools" className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink"><ArrowLeft size={14}/>All tools</Link>
    <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{tool.name}</h1><p className="text-sm text-mute">{tool.desc}</p>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <div className="card p-4"><textarea className="input min-h-[260px] resize-y" value={input} onChange={e=>setInput(e.target.value)} placeholder={tool.placeholder}/>
        <button onClick={run} disabled={busy} className="btn-primary mt-3"><Wand2 size={16}/>{busy?"Working…":"Generate"}</button></div>
      <div className="card min-h-[260px] whitespace-pre-wrap p-5 text-sm leading-relaxed">{out||<span className="text-faint">Your result will appear here.</span>}</div></div></div>);
}
