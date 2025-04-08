// components/layout/main-menu.tsx
"use client";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IMainMenuProps, INavItemComponentProps, ISubItemProps, ItemContentProps } from "@/lib/types";

export function MainMenus({ items }: IMainMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavItemComponent key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavItemComponent({ item }: INavItemComponentProps) {
  const hasSubItems = Boolean(item.items?.length);
  
  return (
    <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} asChild={!!item.url}>
            {item.url ? (
              <a href={item.url}>
                <ItemContent item={item} hasSubItems={hasSubItems} />
              </a>
            ) : (
              <ItemContent item={item} hasSubItems={hasSubItems} />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        
        {hasSubItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SubItem key={subItem.title} subItem={subItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}

function ItemContent({ item, hasSubItems }: ItemContentProps) {
  return (
    <>
      {item.icon && <item.icon className="h-4 w-4" />}
      <span>{item.title}</span>
      {hasSubItems && (
        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      )}
    </>
  );
}

function SubItem({ subItem }: ISubItemProps) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <a href={subItem.url}>
          <span>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}