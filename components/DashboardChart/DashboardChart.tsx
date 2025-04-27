"use client";

import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardContext } from "../Context/DashboardContext";

const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

export const DashboardCharts = () => {
  const { data } = useDashboardContext();

  const grossLoanData = [
    { period: "Today", amount: data.totalGrossLoanDisbursedToday },
    { period: "Month", amount: data.totalGrossLoanDisbursedMonth },
    { period: "Year", amount: data.totalGrossLoanDisbursedYear },
    { period: "All Time", amount: data.totalGrossLoanDisbursedAllTime },
  ];

  const appUserData = [
    {
      period: "App Users",
      Today: data.appUserCountToday ?? 0,
      Week: data.appUserCountWeek ?? 0,
      Month: data.appUserCountMonth ?? 0,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10">
      {/* Area Chart */}
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Gross Loans Disbursed
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={grossLoanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="w-full lg:w-[350px]">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            App User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appUserData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Today" fill={COLORS[0]} />
              <Bar dataKey="Week" fill={COLORS[1]} />
              <Bar dataKey="Month" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
