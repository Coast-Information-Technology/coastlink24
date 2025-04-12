// components/Sidebar/OtherMenus.tsx
"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IProjectItemProps, IProjectsMenuProps } from "@/lib/types";

export function OtherMenus({ projects }: IProjectsMenuProps) {
  const { isMobile } = useSidebar();

//   const projectActions = [
//     { icon: "Folder", label: "View Project" },
//     { icon: "Forward", label: "Share Project" },
//     { separator: true },
//     { icon: "Trash2", label: "Delete Project", destructive: true }
//   ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((project) => (
          <ProjectItem 
            key={project.name} 
            project={project} 
            // actions={projectActions}
            isMobile={isMobile}
          />
        ))}
        <MoreProjectsButton />
      </SidebarMenu>
    </SidebarGroup>
  );
}

function ProjectItem({ project, actions, isMobile }: IProjectItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={project.url} className="flex items-center gap-2">
          <project.icon className="h-4 w-4" />
          <span>{project.name}</span>
        </a>
      </SidebarMenuButton>
      
      {/* <ProjectActionsMenu actions={actions} isMobile={isMobile} /> */}
    </SidebarMenuItem>
  );
}

// function ProjectActionsMenu({ actions, isMobile }: IProjectActionsMenuProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <SidebarMenuAction showOnHover>
//           <MoreHorizontal className="h-4 w-4" />
//           <span className="sr-only">Project actions</span>
//         </SidebarMenuAction>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="w-48 rounded-lg"
//         side={isMobile ? "bottom" : "right"}
//         align={isMobile ? "end" : "start"}
//       >
//         {actions.map((action, index) => (
//           <React.Fragment key={index}>
//             {action.separator ? (
//               <DropdownMenuSeparator />
//             ) : (
//               <DropdownMenuItem className={action.destructive ? "text-destructive" : ""}>
//                 <action.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span>{action.label}</span>
//               </DropdownMenuItem>
//             )}
//           </React.Fragment>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

function MoreProjectsButton() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="text-muted-foreground">
        <MoreHorizontal className="h-4 w-4" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}