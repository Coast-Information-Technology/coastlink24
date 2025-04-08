// data/sidebar.ts
import { 
    SquareTerminal, 
    Bot, 
    BookOpen, 
    Settings2,
    Frame,
    PieChart,
    Map
  } from "lucide-react";
  import { ISidebarData } from "@/lib/types";
  
  export const sidebarData: ISidebarData = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    mainMenu: [
      {
        title: "Loans",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "Status", url: "/tracking" },
          { title: "Request Tracking", url: "/tracking" },
        ],
      },
      {
        title: "Models",
        url: "/tracking",
        icon: Bot,
        items: [
          { title: "Genesis", url: "/tracking" },
          { title: "Explorer", url: "/tracking" },
          { title: "Quantum", url: "/tracking" },
        ],
      },
      {
        title: "Documentation",
        url: "/tracking",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "/tracking" },
          { title: "Get Started", url: "/tracking" },
          { title: "Tutorials", url: "/tracking" },
          { title: "Changelog", url: "/tracking" },
        ],
      },
      {
        title: "Settings",
        url: "/tracking",
        icon: Settings2,
        items: [
          { title: "General", url: "/tracking" },
          { title: "Team", url: "/tracking" },
          { title: "Billing", url: "/tracking" },
          { title: "Limits", url: "/tracking" },
        ],
      },
    ],
    projects: [
      { name: "Design Engineering", url: "/tracking", icon: Frame },
      { name: "Sales & Marketing", url: "/tracking", icon: PieChart },
      { name: "Travel", url: "/tracking", icon: Map },
    ],
  };