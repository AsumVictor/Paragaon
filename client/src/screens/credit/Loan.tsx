import { API_BASE_URL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoanStatus = "approved" | "pending" | "rejected";

interface Loan {
  id: string;
  customerName: string;
  dateApplied: string;
  issuerName: string;
  loanTypeName: string;
  status: LoanStatus;
}

export const SAMPLE_LOANS: Loan[] = [
  {
    id: "L001",
    customerName: "John Doe",
    dateApplied: "2025-04-20",
    issuerName: "Bank A",
    loanTypeName: "Personal Loan",
    status: "approved",
  },
  {
    id: "L002",
    customerName: "Jane Smith",
    dateApplied: "2025-04-18",
    issuerName: "Bank B",
    loanTypeName: "Home Loan",
    status: "pending",
  },
  {
    id: "L003",
    customerName: "Michael Johnson",
    dateApplied: "2025-04-15",
    issuerName: "Bank C",
    loanTypeName: "Car Loan",
    status: "rejected",
  },
];

const statusColors: Record<LoanStatus, string> = {
  approved: "bg-emerald-200 text-emerald-800",
  pending: "bg-yellow-200 text-yellow-800",
  rejected: "bg-red-200 text-red-800",
};

export const LoanCard: React.FC<{ loan: Loan; url: string }> = ({
  loan,
  url,
}) => {
  const navigate = useNavigate();
 
  return (
    <div
      className=" cursor-pointer border border-emerald-600 rounded-2xl shadow-lg p-6 w-full max-w-md"
      onClick={() => navigate(url)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-emerald-900">
          {loan.customerName}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[loan.status.toLowerCase()]
          }`}
        >
          {loan.status.toUpperCase()}
        </span>
      </div>
      <div className="space-y-2 text-emerald-800">
        <p>
          <span className="font-semibold">Date Applied:</span>{" "}
          {loan.dateApplied}
        </p>
        <p>
          <span className="font-semibold">Issuer:</span> {loan.issuerName}
        </p>
        <p>
          <span className="font-semibold">Loan Type:</span> {loan.loanTypeName}
        </p>
        <p>
          <span className="font-semibold">ID:</span> {loan.id}
        </p>
      </div>
    </div>
  );
};

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/loans/`);
        const { data: loans, success } = data;
        // if (!success) {
        //   throw new Error("Unable to fetch loans");
        // }

        setLoans(loans);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchCustomer();

    
  }, []);

  // "accountHolder": "Dampare Odare",
  // "account_id": "144a54fc_e391_4314_ac81_aada4dba4274",
  // "id": "0fc944c3_ee15_4e5e_b15a_48592ba9c4da",
  // "processedBy": "John Doe",
  // "transactionAmount": 800.0,
  // "transactionDate": "Sun, 04 May 2025 00:00:00 GMT",
  // "type": "Deposit"

  return (
  <div className=" flex flex-col items-center p-8">
    <h1 className="text-3xl font-bold text-emerald-900 mb-8">Loan Overview</h1>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {loans.map((loan) => (
        <LoanCard url={`./${loan.id}`} key={loan.id} loan={loan} />
      ))}
    </div>
  </div>
)};

export default LoansPage;
