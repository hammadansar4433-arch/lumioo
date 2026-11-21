"use client";
export default function Error({error,reset}:{error:Error;reset:()=>void}){
  return(<div style={{padding:24,fontFamily:"sans-serif",color:"#fff",background:"#08100f",minHeight:"100vh"}}>
    <h2>Something went wrong</h2>
    <pre style={{whiteSpace:"pre-wrap"}}>{String(error?.message)}{"\n"}{String(error?.stack||"").slice(0,600)}</pre>
    <button onClick={()=>reset()} style={{padding:"8px 16px",marginTop:12}}>Try again</button>
  </div>);
}
