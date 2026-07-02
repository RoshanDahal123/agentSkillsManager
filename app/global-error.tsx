"use client"

import Link from "next/link"


export default function GlobalError({error, reset}:{
    error:Error &{digest?:string},
    reset:()=>void
}){
    return(
        <html>
            <body className="flex flex-col items-center justify-center h-screen gap-4">
                <h2 className="text-xl text-center ">Something went wrong!</h2>
                <p>{error.message}</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={reset} className="btn btn-primary">
                    Try again
                </button>
                <Link href="/" className="btn btn-ghost">
                    Go Home
                </Link>
                </div>
                
            </body>
        </html>
    )
}