import Link from "next/link";
import {Sparkles,ArrowRight,MessageCircle,Wand2,CalendarCheck} from "lucide-react";
const feats=[[MessageCircle,"AI Tutor","Ask anything, get clear step-by-step help."],[Wand2,"14 AI tools","Summaries, quizzes, flashcards, essays and more."],[CalendarCheck,"Plan & track","Keep your week, exams and streak in one place."]] as const;
export default function Landing(){
  return(<main className="mx-auto max-w-6xl px-6 py-8">
    <nav className="flex items-center justify-between"><span className="text-xl font-extrabold grad-text">Lumio</span>
      <Link href="/dashboard" className="btn-ghost">Open app</Link></nav>
    <section className="py-24 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-brand"><Sparkles size={13}/>Your AI study companion</span>
      <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">Study smarter with a tutor that <span className="grad-text">actually gets you.</span></h1>
      <p className="mx-auto mt-6 max-w-xl text-mute">Plan your week, understand hard topics and turn notes into practice, all in one place.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/dashboard" className="btn-primary">Start studying free<ArrowRight size={16}/></Link><Link href="/chat" className="btn-ghost">Try the AI tutor</Link></div>
    </section>
    <section className="grid gap-4 md:grid-cols-3">{feats.map(([I,t,d])=>(
      <div key={t} className="card card-hover p-6"><I className="text-brand" size={22}/><h3 className="mt-4 font-bold">{t}</h3><p className="mt-1 text-sm text-mute">{d}</p></div>))}</section>
  </main>);
}
