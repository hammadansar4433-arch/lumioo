import Link from "next/link";
import {Sparkles} from "lucide-react";
import {TOOLS} from "@/lib/tools";
export default function Tools(){
  return(<div><h1 className="text-3xl font-extrabold tracking-tight">AI <span className="grad-text">tools</span></h1><p className="mt-1 text-sm text-mute">Pick a tool, add your material, get a result.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{TOOLS.map(t=>(
      <Link key={t.slug} href={`/tools/${t.slug}`} className="card card-hover p-5"><Sparkles size={18} className="text-brand"/><h3 className="mt-3 font-bold">{t.name}</h3><p className="mt-1 text-sm text-mute">{t.desc}</p></Link>))}</div></div>);
}
