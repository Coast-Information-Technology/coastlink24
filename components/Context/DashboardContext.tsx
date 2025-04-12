"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAllApiRequest } from "../../lib/apiRequest";
import { getTokenFromCookies } from "../../lib/cookies";

interface DashboardData {
  fullyPaidLoans: number | null;
  totalActiveLoansCount: number | null;
  totalActiveLoans: number | null;
  totalActiveLoansCountToday: number | null;
  totalActiveLoansToday: number | null;
  totalGrossLoanDisbursedToday: number | null;
  totalGrossLoanDisbursedMonth: number | null;
  totalGrossLoanDisbursedYear: number | null;
  totalGrossLoanDisbursedAllTime: number | null;
  averageLoanAmountDisbursedToday: number | null;
  totalNetLoanDisbursedToday: number | null;
  totalNetLoanDisbursedWeek: number | null;
  totalNetLoanDisbursedMonth: number | null;
  totalNetLoanDisbursedYear: number | null;
  totalNetLoanDisbursedAllTime: number | null;
  appUserCountToday: number | null;
  appUserCountWeek: number | null;
  appUserCountMonth: number | null;
}

interface DashboardContextType {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  wemaBalance: number;
  balanceLoading: boolean;
  refreshData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [data, setData] = useState<DashboardData>({
    fullyPaidLoans: null,
    totalActiveLoansCount: null,
    totalActiveLoans: null,
    totalActiveLoansCountToday: null,
    totalActiveLoansToday: null,
    totalGrossLoanDisbursedToday: null,
    totalGrossLoanDisbursedMonth: null,
    totalGrossLoanDisbursedYear: null,
    totalGrossLoanDisbursedAllTime: null,
    averageLoanAmountDisbursedToday: null,
    totalNetLoanDisbursedToday: null,
    totalNetLoanDisbursedWeek: null,
    totalNetLoanDisbursedMonth: null,
    totalNetLoanDisbursedYear: null,
    totalNetLoanDisbursedAllTime: null,
    appUserCountToday: null,
    appUserCountWeek: null,
    appUserCountMonth: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wemaBalance, setWemaBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  const fetchData = async () => {
    const token = getTokenFromCookies();
    if (!token) return;

    try {
      setLoading(true);
      setBalanceLoading(true);

      const endpoints = [
        "/api/analytics/total-repaid-loans/",
        "/api/analytics/active-loans-count/?period=day",
        "/api/analytics/total-active-loans/?period=day",
        "/api/analytics/total-gross-loan-disbursed/?period=day",
        "/api/analytics/total-gross-loan-disbursed/?period=month",
        "/api/analytics/total-gross-loan-disbursed/?period=year",
        "/api/analytics/total-gross-loan-disbursed/?period=all",
        "/api/analytics/average-loan-amount/?period=day",
        "/api/analytics/total-net-loan-disbursed/?period=day",
        "/api/analytics/total-net-loan-disbursed/?period=week",
        "/api/analytics/total-net-loan-disbursed/?period=month",
        "/api/analytics/total-net-loan-disbursed/?period=year",
        "/api/analytics/total-net-loan-disbursed/?period=all",
        "/api/analytics/customer-count/?period=day",
        "/api/analytics/customer-count/?period=week",
        "/api/analytics/customer-count/?period=month",
      ];

      const [
        fullyPaidLoansRes,
        totalActiveLoansCountRes,
        totalActiveLoansRes,
        totalGrossLoanDisbursedTodayRes,
        totalGrossLoanDisbursedMonthRes,
        totalGrossLoanDisbursedYearRes,
        totalGrossLoanDisbursedAllTimeRes,
        averageLoanAmountDisbursedTodayRes,
        totalNetLoanDisbursedTodayRes,
        totalNetLoanDisbursedWeekRes,
        totalNetLoanDisbursedMonthRes,
        totalNetLoanDisbursedYearRes,
        totalNetLoanDisbursedAllTimeRes,
        appUserCountTodayRes,
        appUserCountWeekRes,
        appUserCountMonthRes,
      ] = await Promise.all(
        endpoints.map((endpoint) => getAllApiRequest(endpoint, token))
      );

      setData({
        totalActiveLoansCountToday: totalActiveLoansCountRes.active_loan_count,
        totalActiveLoansToday: totalActiveLoansRes.total_active_loans,
        totalGrossLoanDisbursedToday:
          totalGrossLoanDisbursedTodayRes.total_gross_loan_disbursed,
        totalGrossLoanDisbursedMonth:
          totalGrossLoanDisbursedMonthRes.total_gross_loan_disbursed,
        totalGrossLoanDisbursedYear:
          totalGrossLoanDisbursedYearRes.total_gross_loan_disbursed,
        totalGrossLoanDisbursedAllTime:
          totalGrossLoanDisbursedAllTimeRes.total_gross_loan_disbursed,
        averageLoanAmountDisbursedToday:
          averageLoanAmountDisbursedTodayRes.average_loan_amount || 0,
        totalNetLoanDisbursedToday:
          totalNetLoanDisbursedTodayRes.total_net_loan_disbursed,
        totalNetLoanDisbursedWeek:
          totalNetLoanDisbursedWeekRes.total_net_loan_disbursed,
        totalNetLoanDisbursedMonth:
          totalNetLoanDisbursedMonthRes.total_net_loan_disbursed,
        totalNetLoanDisbursedYear:
          totalNetLoanDisbursedYearRes.total_net_loan_disbursed,
        totalNetLoanDisbursedAllTime:
          totalNetLoanDisbursedAllTimeRes.total_net_loan_disbursed,
        fullyPaidLoans: fullyPaidLoansRes.total_repaid_loans,
        totalActiveLoans: totalActiveLoansRes.total_active_loans,
        totalActiveLoansCount: totalActiveLoansCountRes.active_loan_count,
        appUserCountToday: appUserCountTodayRes.customer_count,
        appUserCountWeek: appUserCountWeekRes.customer_count,
        appUserCountMonth: appUserCountMonthRes.customer_count,
      });

      const balanceData = await getAllApiRequest("/api/get-balance/", token);
      setWemaBalance(balanceData?.balance || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data,
        loading,
        error,
        wemaBalance,
        balanceLoading,
        refreshData: fetchData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
