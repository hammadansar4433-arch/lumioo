import Link from "next/link";
import {Flame,Clock,Target,ArrowRight,CheckCircle2,Circle} from "lucide-react";
// Demo numbers for now. Phase 2 replaces these with real data from the database.
const schedule=[["09:00","Dynamic programming","Algorithms",true],["11:00","ER diagrams & normal forms","Databases",true],["14:00","Process scheduling practice","Operating Systems",false],["17:00","Revise subnetting","Networks",false]] as const;
export default function Dashboard(){
  return(<div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6">
    <section className="card relative col-span-full overflow-hidden p-8 md:col-span-4 md:row-span-2">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl"/>
      <p className="text-sm text-brand">Good day 👋</p>
      <h1 className="mt-2 max-w-md text-4xl font-extrabold leading-tight tracking-tight">What do you want to <span className="grad-text">master today?</span></h1>
      <p className="mt-3 max-w-md text-sm text-mute">Ask the tutor, or jump into a tool. Your plan for today is on the right.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link href="/chat" className="btn-primary">Ask Lumio<ArrowRight size={16}/></Link><Link href="/tools" className="btn-ghost">Browse AI tools</Link></div>
    </section>
    <div className="card p-5 md:col-span-2"><Flame className="text-gold" size={20}/><div className="mt-3 text-3xl font-extrabold">18 days</div><div className="text-xs text-mute">Study streak</div></div>
    <div className="card p-5 md:col-span-1"><Clock className="text-sky" size={20}/><div className="mt-3 text-2xl font-extrabold">2.7h</div><div className="text-xs text-mute">Today</div></div>
    <div className="card p-5 md:col-span-1"><Target className="text-brand" size={20}/><div className="mt-3 text-2xl font-extrabold">78%</div><div className="text-xs text-mute">Quiz avg</div></div>
    <section className="card col-span-full p-6">
      <h2 className="font-bold">Today's plan</h2>
      <ul className="mt-4 grid gap-2 md:grid-cols-2">{schedule.map(([t,n,s,d])=>(
        <li key={n} className="flex items-center gap-3 rounded-2xl border border-line/60 bg-raised/40 p-3">
          {d?<CheckCircle2 size={20} className="text-brand"/>:<Circle size={20} className="text-faint"/>}
          <div className="min-w-0 flex-1"><div className={`truncate text-sm font-semibold ${d?"text-mute line-through":""}`}>{n}</div><div className="text-xs text-faint">{s}</div></div>
          <span className="text-xs text-mute">{t}</span></li>))}</ul>
    </section>
  </div>);
}
