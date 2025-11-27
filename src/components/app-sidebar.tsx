
import * as React from "react"
import { Sidebar, SidebarContent,  SidebarHeader, SidebarRail } from "./ui/sidebar"
import { NavMain } from "./nav-main"

import IconDashboard from "./svg-icon/icon-dashboard"

import IconUserResult from "./svg-icon/icon-user-result"
import { useRouterState } from "@tanstack/react-router"
import type { TRoute } from "../types"
import IconSetting from "./svg-icon/icon-setting"
import IconContent from "./svg-icon/icon-content"
import IconPublicApi from "./svg-icon/icon-public-api"



// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/image/logo/logo.svg",
//   },

//   NavMain:[
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: IconDashboard,
//       isActive: true,
//     },
//     {
//       title: "Users & Results",
//       url: "/",
//       icon: IconUserResult,
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: IconSetting,
//     },
//     {
//       title: "Content Management",
//       url: "#",
//       icon: IconContent,
//     },
//     {
//       title: "Public API Management",
//       url: "#",
//       icon: IconPublicApi,
//     },
//   ],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    location: { pathname },
  } = useRouterState();

  const routes: TRoute[] = [
    {
      name: "Dashboard",
      url: "/",
      icon: IconDashboard,
      isActive: isActiveLink(["/"]),
      isVisible: true,
    },
    {
      name: "Users & Results",
      url: "/users-results",
      icon: IconUserResult,
      isActive: isActiveLink(["/users-results"]),
      isVisible: true,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: IconSetting,
      isActive: isActiveLink(["/settings"]),
      isVisible: true,
    },
    {
      name: "Content Management",
      url: "/content-management",
      icon: IconContent,
      isActive: isActiveLink(["/content-management"]),
      isVisible: true,
    },
    {
      name: "Public API Management",
      url: "/public-api-management",
      icon: IconPublicApi,
      isActive: isActiveLink(["/public-api-management"]),
      isVisible: true,
    },
  ];

  function isActiveLink(items: string[]): boolean {
    return items.includes(pathname);
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img src="/image/logo/logo.svg" alt="Logo"  />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain routes={routes} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
