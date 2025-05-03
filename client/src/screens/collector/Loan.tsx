import CollateralInfo from "@/components/CollateralInfo";
import LoadForm from "@/components/LoadForm";
import LoanIntroduction from "@/components/LoanIntroduction";
import { MultiStepForm } from "@/components/MultiStepForm";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

function CollectorLoan() {
  const { user } = useAuth();

  const formData = {
    // Loan information
    customerID: "",
    loanTypeID: "",
    loanAmount: 0,
    issuedBy: user.employeeID,

    // collaterwal
    collateralName: "",
    value: "",
  };

  const onSubmit = async (data: typeof formData) => {
    console.log("Form submitted", data);
    return new Promise<void>((resolve) => setTimeout(resolve, 2000));
  };

  const stepLabels = ["Customer", "Loan Details", "Collateral"];

  return (
    <div>
      <div
        className=" text-3xl text-center font-semibold py-2 px-2 w-full
       bg-emerald-200 text-emerald-800 rounded-md
      "
      >
        Load Application form{" "}
      </div>
      <MultiStepForm
        steps={[<LoanIntroduction />, <LoadForm />, <CollateralInfo />]}
        initialData={formData}
        onSubmit={onSubmit}
        stepLabels={stepLabels}
        renderSuccess={() => (
          <div>
            <FinishPage />
          </div>
        )}
      />
    </div>
  );
}

const FinishPage = () => {
  return (
    <div className="">
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Congratulations your Load application is successfull
        </h2>
        <p className="text-gray-600 mb-8">Thank you for working with us.</p>
        <Link
          to={".."}
          relative="path"
          className="px-6 py-3 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default CollectorLoan;
