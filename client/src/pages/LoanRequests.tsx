import { LoanCard, SAMPLE_LOANS } from "@/screens/credit/Loan";

const RequestLoans: React.FC = () => {
  return (
    <div className=" flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">
        Loan Overview
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {SAMPLE_LOANS.map((loan) => (
          <LoanCard url={`/loans/${loan.id}`} key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default RequestLoans;
