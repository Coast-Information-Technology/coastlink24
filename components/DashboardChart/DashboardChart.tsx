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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardContext } from "../Context/DashboardContext";

const COLORS = ["#6366F1", "#10B981", "#F59E0B"]; // For pie chart

export const DashboardCharts = () => {
  const { data } = useDashboardContext();

  const grossLoanData = [
    {
      period: "Today",
      amount: data.totalGrossLoanDisbursedToday,
    },
    {
      period: "Month",
      amount: data.totalGrossLoanDisbursedMonth,
    },
    {
      period: "Year",
      amount: data.totalGrossLoanDisbursedYear,
    },
    {
      period: "All Time",
      amount: data.totalGrossLoanDisbursedAllTime,
    },
  ];

  const appUserData = [
    { name: "Today", value: data.appUserCountToday },
    { name: "Week", value: data.appUserCountWeek },
    { name: "Month", value: data.appUserCountMonth },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10">
      {/* Area Chart - Gross Loans Disbursed by Month */}
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Gross Loans Disbursed by Month
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

      {/* Pie Chart - App User Growth */}
      <Card className="w-full sm:w-[300px]">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            App User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appUserData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {appUserData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
