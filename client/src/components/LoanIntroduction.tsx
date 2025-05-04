import { useEffect, useState } from "react";
import CustomSelect from "./SelectInput";
import { useAuth } from "@/contexts/AuthContext";
import { Customer } from "@/types/auth";
import axios from "axios";
import { API_BASE_URL } from "@/config/config";
import { Option } from "@/types/inputs";
import { AlertTriangle, CheckCircle, Loader } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoanIntroduction: React.FC<any> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<Option[]>([]);
  const [customerList, setCustomers] = useState<Customer[]>([]);
  const [currCustomer, setCurrCutomer] = useState<Customer>();

  // eliibity
  const [isEligible, setEligility] = useState<boolean>(false);
  const [eligibleResult, setEligibleResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/customer/collector/${user.zoneId}`
        );
        const {
          success,
          data: customers,
        }: {
          success: boolean;
          data: Customer[];
        } = data;

        if (!success) {
          throw new Error("Unable to fetch customers");
        }

        setLoading(false);
        setCustomers(customers);
        const customerOptions: Option[] = customers.map((c) => {
          return {
            value: c.id,
            label: `${c.name} (${c.phone})`,
          };
        });
        setOptions(customerOptions);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchCustomer();
  }, []);

  const handleCustomerID = (id: string) => {
    updateFormData({ customerID: id });
  };

  useEffect(() => {
    const curr_customer = customerList.find((c) => c.id == formData.customerID);

    setCurrCutomer(curr_customer);
    // check eligibilty
    const checkElibility = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/loans/eligibility/${formData.customerID}`
        );
        if (!data.success) {
          throw new Error("Error occured");
        }

        setLoading(false);
        setEligibleResult(true);
        setEligility(data.data);
      } catch (error) {
        setLoading(false);
        setEligibleResult(true);
        setEligility(false);
        console.log(error);
      }
    };

    if (currCustomer) {
      checkElibility();
    }
  }, [formData.customerID]);

  return (
    <div className=" w-full">
      <div className=" border-2 mt-10 px-5 py-2 rounded-md border-emerald-800">
        Welcome to Paragon! We’re committed to helping you achieve your goals
        with flexible and affordable loan solutions tailored to your needs.
        Please complete this application form carefully, ensuring all
        information provided is accurate and up to date. Our team is here to
        guide you every step of the way, and we look forward to supporting you
        on your financial journey.
      </div>

      {isLoading && customerList.length == 0 && (
        <div className="mt-14 flex items-center space-x-3 p-4 rounded-xl">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <p className="text-blue-800">Loading all customers</p>
        </div>
      )}

      {customerList.length > 0 && (
        <div className="mt-14">
          <CustomSelect
            label={"Select the Customer applying for this Loan"}
            options={options}
            value={formData.customerID}
            onChange={handleCustomerID}
            //   error={"You have to pick a applicant"}
            required
          />
        </div>
      )}

      {isLoading && customerList.length > 0 && (
        <div className="mt-14 flex items-center space-x-3 p-4 rounded-xl">
          <Loader className="w-6 h-6 text-emerald-600 animate-spin" />
          <p className="text-emerald-800">Checking eligibility status…</p>
        </div>
      )}

      {/* Know if user owns load */}
      {!isLoading && eligibleResult && (
        <div className=" mt-10">
          {!isEligible ? (
            <div className="bg-red-300 text-red-900 p-4 rounded-xl shadow-lg flex items-center space-x-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <p className="font-semibold text-base">
                  {currCustomer.name} is currently{" "}
                  <span className="underline">not eligible</span> for a loan at
                  this time.
                </p>
                <p className="text-sm text-red-800">
                  Please check back later or contact support for more
                  information.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-300 text-green-900 p-4 rounded-xl shadow-lg flex items-center space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-base">
                  Congratulations! {currCustomer.name} is{" "}
                  <span className="underline">eligible</span> for a loan.
                </p>
                <p className="text-sm text-green-800">
                  Please proceed with the next steps to complete your
                  application.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* // next step */}
      {!isLoading && eligibleResult && isEligible && (
        <div className=" mt-10 w-full flex justify-end">
          <Button
            isLoading={isLoading}
            onClick={nextStep}
            className=" px-10 text-3xl"
          >
            Next
          </Button>
        </div>
      )}

      {!isLoading && eligibleResult && !isEligible && (
        <div className="">
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-600"
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
              Unfortunaly the loan application was not successful
            </h2>
            <p className="text-gray-600 mb-8">Thank you for working with us.</p>
            <Link
              to={".."}
              relative="path"
              className="px-6 py-3 bg-red-800 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
            >
              Back Home
            </Link>
          </div>
        </div>
      )}

      <div className="h-[3cm]"></div>
    </div>
  );
};

export default LoanIntroduction;
