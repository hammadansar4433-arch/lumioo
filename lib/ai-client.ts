export async function readStream(res:Response,onText:(t:string)=>void){
  const r=res.body!.getReader();const d=new TextDecoder();let t="";
  for(;;){const{done,value}=await r.read();if(done)break;t+=d.decode(value,{stream:true});onText(t);}
}
