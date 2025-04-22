import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"


export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        
            <div 
              onClick={() =>  window.location.href = '/' }
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex gap-2 cursor-pointer"
            >
              <div className="bg-stone-800 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg " >
                <Image 
                  src={"/logo.png"}
                  alt="Team Logo"
                  width={24}
                  height={24}
                  className="h-4 w-4"
                  />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium tracking-widest">Ruhul Amin</span>
                <span className="truncate text-xs font-light">Web developer</span>
              </div>

              
            </div>
         
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
