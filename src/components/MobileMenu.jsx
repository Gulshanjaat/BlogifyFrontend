import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars,FaTimes } from "react-icons/fa";

function MobileMenu(){

const [open,setOpen]=useState(false);

return(

<>

<div className="md:hidden flex justify-between items-center p-5 bg-slate-900 text-white">

<h1 className="font-bold text-2xl">

BLOGIFY

</h1>

<button onClick={()=>setOpen(true)}>

<FaBars size={24}/>

</button>

</div>

{

open &&(

<div className="fixed inset-0 bg-black/50 z-50">

<div className="w-72 h-full bg-white p-5">

<div className="flex justify-end">

<button onClick={()=>setOpen(false)}>

<FaTimes size={25}/>

</button>

</div>

<div className="mt-10 space-y-5">

<NavLink to="/dashboard">

Dashboard

</NavLink>

<NavLink to="/blogs">

Blogs

</NavLink>

<NavLink to="/categories">

Categories

</NavLink>

</div>

</div>

</div>

)

}

</>

)

}

export default MobileMenu;