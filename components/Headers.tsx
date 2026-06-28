import Link from "next/link";

const Headers = () => {
  return (
    
    <div className="navbar bg-base-100 shadow-sm sticky top-0 translate-z-0.5">
      <a className="btn btn-ghost text-xl">daisyUI</a>

      <div className="flex-1"></div>
      
       <ul className="menu menu-horizontal p-0">
         <li>
          <Link href='/skills'>Skills</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/contact'>Contact</Link>
        </li>
        <li>
          <Link href='/register'>Register</Link>
        </li>
       </ul>
      </div>



   
  );
};

export default Headers;
