"use client";
import {useRef,useState,useEffect} from "react";
import {Send} from "lucide-react";
import {readStream} from "@/lib/ai-client";
type Msg={role:"user"|"assistant";content:string};
const ideas=["Explain B-tree splitting simply","Make me a 3-day revision plan for OS","Quiz me on subnetting"];
export default function Chat(){
  const [msgs,setMsgs]=useState<Msg[]>([]);const [text,setText]=useState("");const [busy,setBusy]=useState(false);const end=useRef<HTMLDivElement>(null);
  useEffect(()=>end.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  async function send(q:string){
    if(!q.trim()||busy)return;setText("");setBusy(true);
    const next:Msg[]=[...msgs,{role:"user",content:q}];setMsgs([...next,{role:"assistant",content:""}]);
    try{const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next})});
      if(!res.ok||!res.body)throw new Error();
      await readStream(res,t=>setMsgs([...next,{role:"assistant",content:t}]));}
    catch{setMsgs([...next,{role:"assistant",content:"Something went wrong. Check your GEMINI_API_KEY."}]);}
    setBusy(false);}
  return(<div className="card flex h-[calc(100vh-11rem)] flex-col overflow-hidden md:h-[calc(100vh-8rem)]">
    <div className="flex-1 space-y-4 overflow-y-auto p-5">
      {!msgs.length&&<div className="grid h-full place-items-center text-center"><div><h1 className="text-2xl font-extrabold">Hi, I'm <span className="grad-text">Lumio</span></h1><p className="mt-1 text-sm text-mute">Ask me anything about your studies.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">{ideas.map(i=><button key={i} onClick={()=>send(i)} className="btn-ghost !py-2 !text-xs">{i}</button>)}</div></div></div>}
      {msgs.map((m,i)=>(<div key={i} className={`flex ${m.role==="user"?"justify-end":""}`}>
        <div className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed ${m.role==="user"?"font-medium":"border border-line/60 bg-raised/50"}`} style={m.role==="user"?{background:"linear-gradient(120deg,rgb(var(--brand)),rgb(var(--gold)))",color:"rgb(var(--on-brand))"}:undefined}>{m.content||"…"}</div></div>))}
      <div ref={end}/></div>
    <form onSubmit={e=>{e.preventDefault();send(text);}} className="flex gap-2 border-t border-line/60 p-3">
      <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Ask Lumio…"/>
      <button className="btn-primary" disabled={busy} aria-label="Send"><Send size={16}/></button></form>
  </div>);
}
