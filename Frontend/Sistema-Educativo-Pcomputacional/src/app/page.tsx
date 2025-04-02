'use client'
import { useRouter } from "next/navigation";

export default function Page() {
  const Router = useRouter();
    return <>
      <h1>Hello, Next.js!</h1>
      <button onClick={()=>Router.push("/videojuego")}> PANEL </button>
      
    </>
  }