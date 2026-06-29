"use client"


export default function GlobalError({error, reset}:{
    error:Error &{digest?:string},
    reset:()=>void
}){
    return(
        <html>
            <body className="flex flex-col items-center justify-center h-screen gap-4">
                <h2 className="text-xl text-center ">Something went wrong!</h2>
                <p>{error.message}</p>
                <button onClick={reset} className="btn btn-primary">
                    Try again
                </button>
            </body>
        </html>
    )
}