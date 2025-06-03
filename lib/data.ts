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
import { MdOutlineDisplaySettings } from "react-icons/md";
import { INavLink, ISidebarData } from "@/lib/types";
import { Users, ShieldCheck, TrendingUp } from "lucide-react";

// lib/data.ts

// export const INavLinks: INavLink[] = [
//   { href: "/", label: "Home" },
//   { href: "/lenders", label: "For Lenders" },
//   { href: "/investors", label: "For Investors" },
//   { href: "/borrowers", label: "Borrowers" },
//   { href: "/marketplace", label: "Market Place" },
//   { href: "/features", label: "Features" },
//   { href: "/pricing", label: "Pricing / Partnership Tiers" },
//   { href: "/faq", label: "FAQs" },
//   {
//     label: "Resources",
//     href: "/resources",
//     subLinks: [
//       { href: "/blog", label: "Blog / Insights" },
//       { href: "/help-center", label: "Help Center / FAQ" },
//       { href: "/testimonials", label: "Testimonials" },
//     ],
//   },
//   { href: "/about", label: "About Us" },
//   { href: "/contact", label: "Contact" },
//   { href: "/auth/login", label: "Login" },
// ];

export const INavLinks: INavLink[] = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  {
    label: "Solutions",
    href: "/solutions",
    megaMenu: {
      borrowers: [
        { label: "Overview – What we offer you", href: "/borrowers#overview" },
        { label: "How to Apply", href: "/borrowers#apply" },
        { label: "USSD + Web Access", href: "/borrowers#access" },
        { label: "FAQs for Borrowers", href: "/borrowers#faq" },
        { label: "Repayments & Support", href: "/borrowers#support" },
      ],
      lenders: [
        {
          label: "Licensed Lenders – Use our engine to scale",
          href: "/lenders#licensed",
        },
        {
          label: "Unlicensed Lenders – No license? We've got you",
          href: "/lenders#unlicensed",
        },
        { label: "Custom Dashboard", href: "/lenders#dashboard" },
        { label: "BaaS API Integration", href: "/lenders#api" },
        { label: "Mobile App Monitoring", href: "/lenders#monitoring" },
      ],
      investors: [
        {
          label: "Impact Funding – Invest in Africa’s credit ecosystem",
          href: "/investors#impact",
        },
        {
          label: "Returns & Risk – See yield and borrower analytics",
          href: "/investors#returns",
        },
        { label: "How to Join", href: "/investors#join" },
        { label: "Legal & KYC Assurance", href: "/investors#kyc" },
        { label: "Investor Docs (PDF coming soon)", href: "#" },
      ],
      why: [
        { label: "Unified Lending Engine", href: "/features#engine" },
        { label: "Automated Workflows", href: "/features#automation" },
        { label: "Multi-tenant Architecture", href: "/features#architecture" },
        { label: "Regulatory-Ready + Compliant", href: "/features#compliance" },
        { label: "Built by Fintech Veterans", href: "/features#team" },
      ],
    },
  },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Resources",
    href: "/resources",
    subLinks: [
      { href: "/faq", label: "FAQs" },
      { href: "/support", label: "Support Center" },
      { href: "/docs", label: "Documentation" },
      { href: "/news", label: "News & Updates" },
      { href: "/regulatory", label: "Regulatory Insights" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    subLinks: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
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
          url: "/dashboard/disbursements/verify",
        },
        {
          title: "Search Multiple Payments",
          url: "/dashboard/disbursements/multiple-search",
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
        {
          title: "Mandate Ref Verification",
          url: "/dashboard/mandate_references/verification",
        },
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
    {
      name: "Loan Product Settings",
      url: "/dashboard/loan-product-settings",
      icon: MdOutlineDisplaySettings,
    },
    { name: "Sales & Marketing", url: "/tracking", icon: PieChart },
    { name: "Travel", url: "/tracking", icon: Map },
  ],
};
