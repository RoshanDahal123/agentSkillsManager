'use client'

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
  const router= useRouter();
  const {login, isAuthenticated,isLoading}=useAuth();
  

    const [isSubmitting,setIsSubmitting]=useState(false);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    //Redirect if already authenticated

    if(!isLoading && isAuthenticated){
      router.push("/dashboard")
      return null;
    }

    const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setError("");
     
       if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsSubmitting(true);


    try{
      await login({email,password});
      router.push('/dashboard');
    }
    catch(err:any){
      setError(err instanceof Error ? err.message : "Login failed");
    }
    finally {
      setIsSubmitting(false);
    }
  }

  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <h2 className="card-title text-2xl justify-center">Welcome Back!!</h2>
      <p className="text-center text-base-content/70">
        Login to create and share agent skills
      </p>

      <form action="" className="mt-4" onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="form-control">
          <label htmlFor="" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
       
        
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        

        <div className="form-control mt-6 flex justify-center ">
          <button type="submit" className="btn btn-primary w-full rounded-2xl"
          disabled={isSubmitting}>
             {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

        <div className="divider">OR</div>

      <p className="text-center">
        Dont have an account?{" "}
        <Link href="/register" className="link link-primary">
          Sign up
        </Link>
      </p>
    </>)
}