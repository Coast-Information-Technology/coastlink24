// types/sidebar.ts
import { LucideIcon } from "lucide-react";

// User interface
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  designation?: string;
  created_at?: string;
  updated_at?: string;
  gender?: string;
  is_active?: boolean;
  is_deactivated?: boolean;
  img?: string;
}

// Navigation item interface
export interface INavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: INavItem[];
}

// Project interface
export interface IProject {
  name: string;
  url: string;
  icon: LucideIcon;
}

// Sidebar data interface
export interface ISidebarData {
  user: IUser;
  mainMenu: INavItem[];
  projects: IProject[];
}

// Sidebar context interface
export interface ISidebarContextProps {
  isCollapsed: boolean;
  isMobile: boolean;
  // Add other sidebar context properties if needed
}

// Menu action interface
export interface IMenuAction {
  icon: LucideIcon;
  label: string;
  destructive?: boolean;
  separator?: boolean;
}

// Project action interface
export interface IProjectAction extends IMenuAction {
  // Can add project-specific properties if needed
}

// User menu item interface
export interface IUserMenuItem extends IMenuAction {
  // Can add user-specific properties if needed
}

// Component props interfaces
export interface IMainMenuProps {
  items: INavItem[];
}

export interface IProjectsMenuProps {
  projects: IProject[];
}

export interface IUserMenuProps {
  user: IUser;
}

export interface INavItemComponentProps {
  item: INavItem;
}

export interface ItemContentProps {
  item: INavItem;
  hasSubItems: boolean;
}

export interface ISubItemProps {
  subItem: {
    title: string;
    url?: string;
  };
}

export interface IProjectItemProps {
  project: IProject;
  actions?: IProjectAction[];
  isMobile: boolean;
}

export interface IProjectActionsMenuProps {
  actions: IProjectAction[];
  isMobile: boolean;
}

export interface ILogoProps {
  isCollapsed: boolean;
}

export interface IUserButtonProps {
  user: IUser;
}

export interface IUserDropdownHeaderProps {
  user: IUser;
}

// SIDEBAR TYPES ENDS HERE
