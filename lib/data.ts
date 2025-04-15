// data/sidebar.ts
import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  Map,
  LayoutDashboard,
  Users2,
} from "lucide-react";
import { MdOutlineDisplaySettings } from "react-icons/md"
import { INavLink, ISidebarData } from "@/lib/types";

// lib/data.ts

export const INavLinks: INavLink[] = [
  { href: "/", label: "Home" },
  { href: "/lenders", label: "For Lenders" },
  { href: "/investors", label: "For Investors" },
  { href: "/borrowers", label: "Borrower Access" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing / Partnership Tiers" },
  { href: "/faq", label: "FAQs" },
  // {
  //   label: "Resources",
  //   subLinks: [
  //     { href: "/blog", label: "Blog / Insights" },
  //     { href: "/help-center", label: "Help Center / FAQ" },
  //     { href: "/testimonials", label: "Testimonials" },
  //   ],
  // },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];



export const sidebarData: ISidebarData = {
  user: {
    id: "1",
    first_name: "",
    last_name: "",
  },
  mainMenu: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Users",
      icon: Users2,
      url: "/dashboard/users",
    },
    {
      title: "Lenders",
      icon: Users2,
      url: "/dashboard/lenders",
    },
    {
      title: "Loans",
      icon: SquareTerminal,
      items: [
        { title: "Loan Status", url: "/dashboard/loans" },
        {
          title: "Loan Request Tracking",
          url: "/dashboard/loan_request_tracking",
        },
      ],
    },
    {
      title: "Disbursements",
      icon: Bot,
      items: [
        { title: "All Payments", url: "/dashboard/disbursements" },
        {
          title: "ReInitiate Failed Payment",
          url: "/dashboard/disbursements/reinitiate_payment",
        },
        {
          title: "Payment Verification",
          url: "/dashboard/payments_verification",
        },
        {
          title: "Search Multiple Payments",
          url: "/dashboard/search_multiple_payments",
        },
      ],
    },
    {
      title: "Collections",
      icon: BookOpen,
      items: [
        { title: "All Collections", url: "/dashboard/collections" },
        { title: "Collection Checker", url: "/dashboard/collection_checker" },
      ],
    },
    {
      title: "Borrowers",
      icon: BookOpen,
      items: [
        { title: "All Borrower", url: "/dashboard/borrowers" },
        { title: "Borrower Choices", url: "/dashboard/borrowers_choice" },
      ],
    },
    {
      title: "Mandate References",
      icon: BookOpen,
      items: [
        { title: "All Mandate Ref", url: "/dashboard/mandate_references" },
        { title: "Mandate Ref Verification", url: "/dashboard/mandate_references/verification" },
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
    { name: "Loan Product Settings", url: "/dashboard/loan-product-settings", icon: MdOutlineDisplaySettings },
    { name: "Sales & Marketing", url: "/tracking", icon: PieChart },
    { name: "Travel", url: "/tracking", icon: Map },
  ],
};
