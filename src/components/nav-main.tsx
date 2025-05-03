import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
}) {
  const pathname = usePathname()

  // // Function to check if a URL is active (exact match or parent of current path)
  // const isActiveUrl = (url: string) => {
  //   // Exact match
  //   if (pathname === url) return true
  //   // Parent path match (for nested routes)
  //   if (pathname.startsWith(url) && (url !== '/' || pathname === '/')) return true
  //   return false
  // }

  const isActiveUrl = (url: string) => pathname === url;


  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0
          const isItemActive = item.isActive ?? isActiveUrl(item.url)
          const activeSubItem = item.items?.find(subItem => subItem.isActive ?? isActiveUrl(subItem.url))
          
          // If any sub-item is active, the parent should appear active too
          const shouldBeOpen = isItemActive || !!activeSubItem

          if (hasSubItems) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={shouldBeOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      className={cn(
                        "transition-all group",
                        shouldBeOpen && "font-medium bg-slate-100 dark:bg-slate-800"
                      )}
                    >
                      {item.icon && <item.icon className={cn(
                        "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-50",
                        shouldBeOpen && "text-slate-900 dark:text-slate-50"
                      )} />}
                      <span className={cn(
                        "group-hover:text-slate-900 dark:group-hover:text-slate-50",
                        shouldBeOpen && "text-slate-900 dark:text-slate-50"
                      )}>{item.title}</span>
                      <ChevronRight className={cn(
                        "ml-auto transition-all duration-200 group-data-[state=open]/collapsible:rotate-90",
                        "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-50",
                        shouldBeOpen && "text-slate-900 dark:text-slate-50"
                      )} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubItemActive = subItem.isActive ?? isActiveUrl(subItem.url)
                        
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link 
                                href={subItem.url}
                                className={cn(
                                  "w-full transition-all",
                                  "hover:text-slate-900 dark:hover:text-slate-50",
                                  isSubItemActive && 
                                  "bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-50 before:absolute before:left-0 before:w-1 before:h-full before:bg-primary before:rounded-r-sm"
                                )}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  className={cn(
                    "transition-all group",
                    isItemActive && "bg-slate-100 dark:bg-slate-800 font-medium before:absolute before:left-0 before:w-1 before:h-full before:bg-primary before:rounded-r-sm"
                  )}
                >
                  <Link 
                    href={item.url} 
                    className="flex items-center gap-2 w-full"
                  >
                    {item.icon && <item.icon className={cn(
                      "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-50",
                      isItemActive && "text-slate-900 dark:text-slate-50"
                    )} />}
                    <span className={cn(
                      "group-hover:text-slate-900 dark:group-hover:text-slate-50",
                      isItemActive && "text-slate-900 dark:text-slate-50"
                    )}>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}