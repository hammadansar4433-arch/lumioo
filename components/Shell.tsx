"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {LayoutGrid,MessageCircle,Wand2,Sun,Moon,Sparkles} from "lucide-react";
import {useEffect,useState} from "react";
const nav=[{href:"/dashboard",label:"Home",I:LayoutGrid},{href:"/chat",label:"Tutor",I:MessageCircle},{href:"/tools",label:"Tools",I:Wand2}];
export default function Shell({children}:{children:React.ReactNode}){
  const path=usePathname();const [theme,setTheme]=useState("dark");const [today,setToday]=useState("");
  useEffect(()=>{setTheme(document.documentElement.getAttribute("data-theme")||"dark");setToday(new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"}));},[]);
  const toggle=()=>{const n=theme==="dark"?"light":"dark";setTheme(n);document.documentElement.setAttribute("data-theme",n);try{localStorage.setItem("lumio-theme",n)}catch{}};
  return(<div className="min-h-screen md:pl-28">
    {/* floating icon rail (desktop) */}
    <aside className="fixed left-4 top-4 bottom-4 z-30 hidden w-20 flex-col items-center justify-between rounded-[28px] border border-line/70 bg-surface/70 py-5 backdrop-blur-xl md:flex">
      <Link href="/" className="grid h-11 w-11 place-items-center rounded-2xl text-lg font-extrabold" style={{background:"linear-gradient(120deg,rgb(var(--brand)),rgb(var(--gold)))",color:"rgb(var(--on-brand))"}}>L</Link>
      <nav className="flex flex-col gap-2">{nav.map(({href,label,I})=>{const on=path.startsWith(href);return(
        <Link key={href} href={href} className={`flex w-14 flex-col items-center gap-1 rounded-2xl py-2.5 text-[10px] font-semibold transition ${on?"bg-brand/15 text-brand":"text-mute hover:bg-raised hover:text-ink"}`}><I size={20}/>{label}</Link>);})}</nav>
      <button onClick={toggle} aria-label="Toggle theme" className="grid h-11 w-11 place-items-center rounded-2xl text-mute hover:bg-raised hover:text-ink">{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
    </aside>
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-8 md:pb-10">
      <header className="mb-6 flex items-center justify-between">
        <div className="text-sm text-mute">{today}</div>
        <Link href="/chat" className="btn-primary"><Sparkles size={15}/>Ask Lumio</Link>
      </header>
      {children}
    </div>
    {/* bottom nav (mobile) */}
    <nav className="fixed inset-x-4 bottom-4 z-30 flex justify-around rounded-3xl border border-line/70 bg-surface/80 p-2 backdrop-blur-xl md:hidden">{nav.map(({href,label,I})=>{const on=path.startsWith(href);return(
      <Link key={href} href={href} className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[10px] font-semibold ${on?"bg-brand/15 text-brand":"text-mute"}`}><I size={20}/>{label}</Link>);})}</nav>
  </div>);
}
