import React from "react";
import { Check, X, RotateCw } from "lucide-react";

export const loanStatus = [
  "eligibility",
  "principal amount selection",
  "tenure selection",
  "approval",
  "confirmation",
  "mandate reference",
  "disbursement processing",
  "disbursement failure",
  "disbursement successful",
] as const;

type LoanStatusType = typeof loanStatus[number];

interface LoanTrackerProps {
  status: LoanStatusType;
}

const getFilteredStatuses = (status: LoanStatusType): LoanStatusType[] => {
  return loanStatus.filter(
    (statusChoice) =>
      !(
        (status === "disbursement successful" ||
          status === "disbursement failure") &&
        statusChoice === "disbursement processing"
      ) &&
      !(
        status === "disbursement successful" &&
        statusChoice === "disbursement failure"
      )
  );
};

const getStatusColor = (statusChoice: LoanStatusType): string => {
  if (statusChoice === "disbursement processing") return "bg-orange-500";
  if (statusChoice === "disbursement failure") return "bg-red-500";
  return "bg-green-500";
};

const getStatusIcon = (statusChoice: LoanStatusType) => {
  if (statusChoice === "disbursement processing") return <RotateCw className="h-4 w-4 text-white animate-spin" />;
  if (statusChoice === "disbursement failure") return <X className="h-4 w-4 text-white" />;
  return <Check className="h-4 w-4 text-white" />;
};

export const LoanTracker: React.FC<LoanTrackerProps> = ({ status }) => {
  const filteredStatuses = getFilteredStatuses(status);
  const currentIndex = filteredStatuses.indexOf(status);

  return (
    <div className="flex flex-col items-start w-full px-4 py-6 space-y-6">
      {filteredStatuses.map((statusChoice, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const color = isCompleted || isCurrent
          ? getStatusColor(statusChoice)
          : "bg-gray-300";

        return (
          <div key={statusChoice} className="flex items-start space-x-4 w-full">
            {/* Line and Dot */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={`rounded-full h-6 w-6 flex items-center justify-center transition-colors duration-300 ${color}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {(isCompleted || isCurrent) && getStatusIcon(statusChoice)}
              </div>

              {/* Connector line */}
              {index < filteredStatuses.length - 1 && (
                <div className="w-px h-12 bg-gray-300 mt-1"></div>
              )}
            </div>

            {/* Label */}
            <div className="text-sm capitalize mt-1">{statusChoice}</div>
          </div>
        );
      })}
    </div>
  );
};
