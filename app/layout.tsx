import "./globals.css";
import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
const font=Plus_Jakarta_Sans({subsets:["latin"],variable:"--font-jakarta"});
export const metadata:Metadata={title:"Lumio – AI study companion",description:"Plan, learn and revise with an AI tutor."};
const init=`try{document.documentElement.setAttribute('data-theme',localStorage.getItem('lumio-theme')||'dark')}catch(e){}`;
export default function Root({children}:{children:React.ReactNode}){
  return(<html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:init}}/></head>
  <body className={`${font.variable} font-sans`}>{children}</body></html>);
}
