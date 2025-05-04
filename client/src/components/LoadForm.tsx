import { BadgeCheck, Verified } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { motion } from "framer-motion";
import Button from "./Button";
import axios from "axios";
import { API_BASE_URL } from "@/config/config";

interface loanTypes {
  id: string;
  loanTypeName: string;
  description: string;
  loanLifeSpan: string;
  minimumAmount: number;
  maxAmount: number;
  interest: string;
}
[];

const LoadForm: React.FC<any> = ({
  formData,
  updateFormData,
  prevStep,
  nextStep,
}) => {
  const [loans, setLoans] = useState<loanTypes[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleLoanType = (id: string) => {
    updateFormData({ loanTypeID: id });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateFormData({ loanAmount: value });
  };

  useEffect(()=>{
    const getLoanTypes = async()=>{
      setLoading(true);

      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/loans/types`
        );
        const {
          success,
          data: loans,
        }: {
          success: boolean;
          data: loanTypes[];
        } = data;

        if (!success) {
          throw new Error("Unable to fetch customers");
        }

        setLoading(false);
        setLoans(loans);
        
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getLoanTypes()
  }, [])


  return (
    <div>
      <div className="   mt-10">
        <p className="font-medium text-2xl">Choose Loan Type</p>

        {!isLoading && loans.length > 0 && (
          <div className=" mt-5 grid grid-cols-3 gap-4 justify-center">
            {loans.map((loan, index) => (
              <LoanCard
                formData={formData}
                key={index}
                loan={loan}
                index={index}
                onClick={handleLoanType}
              />
            ))}
          </div>
        )}
      </div>

      <div className=" mt-10">
        <p className="font-medium text-2xl">Amount Customer is borrowing</p>
        <motion.div custom={0} initial="hidden" animate="visible">
          <FormInput
            label=""
            name="loanAmount"
            type="text"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-10 flex justify-between"
        custom={7}
        initial="hidden"
        animate="visible"
      >
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>
        <Button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center"
        >
          Next Step
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
};

export default LoadForm;

const LoanCard = ({ formData, loan, index, onClick }) => {
  const colorPalette = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
  ];

  const colorClass = colorPalette[index % colorPalette.length];

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (formData.loanTypeID == loan.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [formData.loanTypeID]);

  return (
    <div className={`p-4 rounded-xl shadow-lg ${colorClass} w-full`}>
      <div className="flex items-center mb-2">
        <BadgeCheck className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">{loan.loanTypeName}</h2>
      </div>
      <p className="text-sm mb-2">{loan.description}</p>
      <ul className="text-sm mb-4 space-y-1">
        <li>
          <span className="font-medium">Lifespan:</span> {loan.loanLifeSpan} Months
        </li>
        <li>
          <span className="font-medium">Min Amount:</span> GHC{" "}
          {loan.minimumAmount}
        </li>
        <li>
          <span className="font-medium">Max Amount:</span> GHC {loan.maxAmount}
        </li>
        <li>
          <span className="font-medium">Interest:</span> {loan.interest}
        </li>
      </ul>
      <button
        disabled={isSelected}
        onClick={() => onClick(loan.id)}
        className="w-full bg-white text-sm text-gray-800 font-medium py-2 rounded-lg  hover:bg-gray-200 transition disabled:bg-white px-1 disabled:text-emerald-700"
      >
        <div className="flex gap-3 items-center">
          {isSelected && <Verified />}
          <span>Select</span>
        </div>
      </button>
    </div>
  );
};
