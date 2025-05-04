import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegMoneyBillAlt,
  FaCheck,
} from "react-icons/fa";

export default function LoanDetailsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50">
      {/* Loan Status Update */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-emerald-700">
          Loan Details
        </h1>
        <Select>
          <SelectTrigger className="w-56 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <SelectValue placeholder="Update Loan Status" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-lg shadow-lg border border-emerald-200">
            {/* Approve Option */}
            <SelectItem
              value="APPROVED"
              className="flex items-center p-2 hover:bg-emerald-100 text-emerald-700  flex-row"
            >
              <div className="text-[18px] flex flex-row items-center justify-start gap-3">
                <FaCheckCircle className=" text-emerald-500" />
                Approve
              </div>
            </SelectItem>
            {/* Reject Option */}
            <SelectItem
              value="REJECTED"
              className="flex items-center p-2 hover:bg-red-100 text-red-700"
            >
              <div className="text-[18px] flex flex-row items-center justify-start gap-3">
                <FaTimesCircle className="mr-2 text-red-500" />
                Reject
              </div>
            </SelectItem>
            {/* Disburse Option */}
            <SelectItem
              value="DISBURSED"
              className="flex items-center p-2 hover:bg-amber-100 text-amber-700"
            >
              <div className="text-[18px] flex flex-row items-center justify-start gap-3">
                <FaRegMoneyBillAlt className="mr-2 text-amber-500" />
                Disburse
              </div>
            </SelectItem>
            {/* Settle Option */}
            <SelectItem
              value="SETTLED"
              className="flex items-center p-2 hover:bg-teal-100 text-teal-700"
            >
              <div className="text-[18px] flex flex-row items-center justify-start gap-3">
                <FaCheck className="mr-2 text-teal-500" />
                Settle
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left aside: Customer and Collateral */}
        <aside className="md:col-span-1 space-y-4">
          {/* Customer Card */}
          <Card className="bg-white shadow-lg border border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-600">Customer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-16 h-16 mb-2 border border-emerald-200">
                <AvatarFallback className="bg-emerald-200 text-emerald-600">
                  CU
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-emerald-600">John Doe</p>
                <p className="text-sm text-gray-500">Customer ID: C12345</p>
                <p className="text-sm text-gray-500">Phone Number: C12345</p>
                <div className=" mt-3 bg-yellow-100 text-yellow-900 font-extrabold py-1 px-3 rounded-lg">
                  Zone B
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collateral Card */}
          <Card className="bg-white shadow-lg border border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-600">Collateral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-emerald-700">
                Car - Toyota Corolla 2019
              </p>
              <p className="text-sm text-gray-500">Collateral ID: CL9876</p>
              <p className="text-sm text-gray-500 mt-2">
                Estimated Value: $15,000
              </p>
            </CardContent>
          </Card>
        </aside>

        {/* Main section: Loan Details */}
        <main className="md:col-span-2 space-y-4">
          <Card className="bg-white shadow-lg border border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-600">
                Loan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-emerald-700">Loan ID</p>
                  <p className="text-gray-800">L00123</p>
                </div>
                <div className="">
                  <p className="font-semibold text-emerald-700">Loan Type</p>
                  <div className=" flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-800 border border-yellow-200 uppercase"
                    >
                      Personal Loan
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border border-blue-200 uppercase"
                    >
                      2 years span
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-800 border border-yellow-200 uppercase"
                    >
                      2.5% Interest
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-emerald-700">Loan Amount</p>
                  <p className="text-gray-800">$10,000</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">
                    Outstanding Amount
                  </p>
                  <p className="text-gray-800">$4,000</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">
                    Amount Settled
                  </p>
                  <p className="text-gray-800">$6,000</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">Loan Status</p>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase"
                  >
                    Disbursed
                  </Badge>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">
                    Application Date
                  </p>
                  <p className="text-gray-800">2025-04-01</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">
                    Approval Date
                  </p>
                  <p className="text-gray-800">2025-04-05</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-700">Due Date</p>
                  <p className="text-gray-800">2025-10-01</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issued By and Approved By */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white shadow-lg border border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-600">Issued By</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 border border-emerald-200">
                  <AvatarFallback className="bg-emerald-200 text-emerald-600">
                    IB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-emerald-700">Jane Smith</p>
                  <p className="text-sm text-gray-500">Employee ID: E5678</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-600">Approved By</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 border border-emerald-200">
                  <AvatarFallback className="bg-emerald-200 text-emerald-600">
                    AB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-emerald-700">
                    Michael Johnson
                  </p>
                  <p className="text-sm text-gray-500">Employee ID: E3456</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
