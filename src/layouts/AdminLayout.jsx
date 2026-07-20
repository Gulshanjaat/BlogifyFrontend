import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/MobileMenu";
import { Outlet } from "react-router-dom";

function AdminLayout(){

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 min-h-screen bg-slate-100 dark:bg-slate-950 overflow-x-hidden">

  <MobileMenu />

  <div className="p-4 sm:p-6 lg:p-8">

    <Outlet />

  </div>

</div>
</div>

)

}

export default AdminLayout;