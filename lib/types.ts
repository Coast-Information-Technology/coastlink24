// types/sidebar.ts
import { LucideIcon } from "lucide-react";
import { ElementType } from "react";

export interface INavLink {
  label: string;
  href: string;
  subLinks?: Array<{
    label: string;
    href: string;
  }>;
}

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
  icon: ElementType;
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

export interface ISearchParams {
  q?: string;
  startDate?: string;
  endDate?: string;
}

// lib/types.ts

export interface IBorrowersPageProps {
  searchParams: {
    q?: string;
  };
}

export interface IBorrower {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_email_verified: boolean;
  bank_name: string;
  account_number: string;
  bank_code: string;
  bvn?: string;
  company_name: string;
  category: string;
  deactivate_login: boolean;
  is_deleted: boolean;
  attempt_count: number;
  created_at: string | null;
  updated_at: string | null;
  last_token_issued_at: string | null;
  last_attempt_at: string | null;
  remita_customer_id: string;
  last_request_id: string;
  img?: string;
  wema_bank_code?: string;
  paystack_recipient_code?: string;
}

export interface IBorrowerDataTableProps {
  data: IBorrower[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export interface IBorrowerData {
  id: string;
  created_at: string;
  updated_at: string;
  request_id: string;
  phone_number: string;
  max_eligible_offer: string | number;
  first_loan_offer: string | number;
  second_loan_offer: string | number;
  principal_amount: string | number;
  tenure: string;
  interest_amount: string | number;
  processing_fee: string | number;
  monthly_repayment: string | number;
  confirmation_status: string;
}

export interface IBorrowerLoanChoiceDataTableProps {
  downloadData: IBorrowerData[];
  data: IBorrowerData[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export interface IBorrowerChoice {
  id: string;
  request_id: string;
  phone_number: string;
  max_eligible_offer: number;
  first_loan_offer: number;
  second_loan_offer: number;
  principal_amount: number;
  tenure: string;
  interest_amount: number;
  processing_fee: number;
  monthly_repayment: number;
  confirmation_status: string;
  created_at: string;
  updated_at: string;
}

export interface IPayment {
  id: number;
  created_at: string;
  updated_at: string;
  phone_number: string;
  payment_method: string;
  paystack_recipient_code: string;
  amount: string;
  transfer_reference: string;
  transfer_code: string;
  bank_charges: string;
  transfer_status: string;
  mandate_reference: string;
  borrower_bank_name: string;
  borrower_account_number: string;
  borrower_account_name: string;
  transaction_message: string;
  transaction_code: string;
  request_data: string;
  request_time: string;
  response_data: string;
  response_time: string;
}

export interface IDisbursementsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface IDisbursement {
  id: number;
  created_at: string;
  updated_at: string;
  phone_number: string;
  payment_method: string;
  paystack_recipient_code: string;
  amount: string;
  transfer_reference: string;
  transfer_code: string;
  bank_charges: string;
  transfer_status: string;
  mandate_reference: string;
  borrower_bank_name: string;
  borrower_account_number: string;
  borrower_account_name: string;
  transaction_message: string;
  transaction_code: string;
  request_data: string;
  request_time: string;
  response_data: string;
  response_time: string;
}

export interface DisbursementsDataTableProps {
  downloadData: IDisbursement[];
  data: IDisbursement[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (page: number) => void;
  setPageSize: (size: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export interface IApiError {
  message: string;
  status?: number;
}

export interface ILoan {
  id: string;
  mandate_reference: string;
  phone_number: string;
  channel: string;
  principal_amount: string;
  interest_amount: string;
  processing_fee: string;
  repayment_amount: string;
  total_repayment_amount: string;
  total_outstanding_amount: string;
  tenure: string;
  repayment_frequency: string;
  disbursement_status: string;
  disbursement_date: string;
  repayment_date: string;
  last_installment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  remita_total_outstanding_balance?: string;
  repayment_count?: string;
  remita_collection_id?: string;
  manual_repayment_id?: string;
}

export interface ILoansDataTableProps {
  downloadData: ILoan[];
  data: ILoan[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (pageNo: number) => void;
  setPageSize: (pageSize: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export interface ILoanReqTrackingDataTableProps {
  downloadData: any[];
  data: any[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export interface IMandateRefDataTableProps {
  downloadData: any[];
  data: any[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export interface IProduct {
  product_1_interest: string;
  product_1_tenure: string;
  product_1_minimum_loan: string;
  product_1_maximum_loan: string;
  product_1_dti: string;
  product_1_management_fee: string;
  product_2_interest: string;
  product_2_tenure: string;
  product_2_minimum_loan: string;
  product_2_maximum_loan: string;
  product_2_dti: string;
  product_2_management_fee: string;
  product_3_interest: string;
  product_3_tenure: string;
  product_3_minimum_loan: string;
  product_3_maximum_loan: string;
  product_3_dti: string;
  product_3_management_fee: string;
  remita_fee: string;
  loan_request_cache_duration: string;
}
