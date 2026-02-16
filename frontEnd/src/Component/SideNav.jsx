import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";




import { InvoiceContext } from "@/Context/InvoiceContext";
import { Handbag, House, LogOut, Logs, Menu, Notebook, Package, StickyNote, User, User2, User2Icon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { href, useLocation } from "react-router-dom";

const SideNavInner = () => {
  const [active, setActive] = useState("home");
  const { isMobile, setOpenMobile } = useSidebar();
  const {navigate, setToken, business, setBusiness, role, setRole,setName,name, userPermission}=useContext(InvoiceContext)
  const location=useLocation()

  useEffect(()=>{
    console.log(userPermission)
  },[userPermission])


 
  const menuItems = [
    { name: "Dashboard", icon: House, key: "home", href:'/home/*' },
    // { name: "Customers", icon: User, key: "customers" , href:'/home/coustomer'},
   
     ...(userPermission === "edit"
    ? [{ name: "Customers", icon: User, key: "customers" , href:'/home/coustomer'}]
    : []),
    ...(userPermission === "edit"
    ? [{ name: "Items", icon: Handbag, key: "items", href:'/home/item' }]
    : []),
    {name:"Company", icon: Package, key:"package", href:'/home/company'},
    // {name:"All Invoice", icon: Notebook, key:"allinvoice", href:'/home/allinvoice'},
   ...(role === "admin"
    ? [{ name: "All User", icon: User2Icon, key: "allUser", href: "/home/allUser" }]
    : [])
    // { name: "Invoices", icon: StickyNote, key: "invoices" ,href:'' },
  ];
  // useEffect(()=>{
  //   console.log(menuItems.href)
  // },[])

  return (
    <>
      {/* Mobile Menu Button — SAME POSITION */}
      <div className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md">
        <SidebarTrigger>
          <Menu className="w-6 h-6" />
        </SidebarTrigger>
      </div>

      {/* Sidebar */}
      <Sidebar className="bg-slate dark:bg-gray-900 shadow-xl w-64">
        
        {/* Header — SAME STYLE */}
       <SidebarHeader className="flex flex-col items-center py-6">
  <img
    src="/user.png"
    alt="Admin"
    className="w-16 h-16 rounded-full ring-2 ring-red-400 shadow-md animate-float"
  />

  <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
    {name}
  </h3>

  <p className="text-sm text-gray-500 dark:text-gray-400">
    {role}
  </p>

  {business && (
    <div className="mt-2 px-3 py-1 text-xs font-semibold rounded-full
                    bg-red-100 text-red-600 dark:bg-red-900/30">
      {business.companyName}
    </div>
  )}
</SidebarHeader>


        <SidebarSeparator />

        {/* Menu — SAME STYLE */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenu key={item.key} className="mt-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => {
                          setActive(item.key);
                          navigate(item.href)
                          console.log(item.href)
                          if (isMobile) setOpenMobile(false); // close on mobile
                        }}
                        className={`
                          flex items-center gap-3 px-4 py-2 rounded-lg
                          transition-all duration-300
                          ${
                            location.pathname === item.href
                              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-base font-semibold">
                          {item.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
  <SidebarGroupContent>
    <SidebarMenuItem>
      <SidebarMenuButton
      onClick={()=>{setToken('');localStorage.setItem('token','') ; setRole('');localStorage.setItem('role','') ; setName('');localStorage.setItem('name','') }}
        className="
          group flex items-center gap-3 
          px-4 py-3 rounded-xl
          text-red-500 font-semibold
          transition-all duration-300
          hover:bg-red-50 dark:hover:bg-red-900/20
          hover:text-red-600
          active:scale-[0.98]
        "
      >
        <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />

        <span className="text-base tracking-wide">
          Logout
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarGroupContent>
</SidebarGroup>

        </SidebarContent>
      </Sidebar>
    </>
  );
};

const SideNav = () => {
  return (
    <SidebarProvider>
      <SideNavInner />
    </SidebarProvider>
  );
};

export default SideNav;
