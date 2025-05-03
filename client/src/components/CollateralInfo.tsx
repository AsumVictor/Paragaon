import { motion } from "framer-motion";
import FormInput from "./FormInput";
import Button from "./Button";

const CollateralInfo: React.FC<any> = ({
  formData,
  updateFormData,
  prevStep,
  handleSubmit,
  isLoading,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <p className=" mt-10">
        Provide information about the collateral that will be use for this
        application
      </p>

      <div className=" mt-10">
        <motion.div custom={0} initial="hidden" animate="visible">
          <FormInput
            label="What is the name of the collateral"
            name="collateralName"
            type="text"
            value={formData.collateralName}
            onChange={handleChange}
            required
          />
        </motion.div>
      </div>

      <div className=" mt-10">
        <motion.div custom={0} initial="hidden" animate="visible">
          <FormInput
            label="What is the current value of the collateral"
            name="value"
            type="text"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="mt-6 text-sm text-gray-500 italic"
      >
        By submitting this form, you confirm that all the information provided
        is accurate and complete.
      </motion.p>

      <motion.div
        className="mt-10 flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
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
          type="submit"
          isLoading={isLoading}
          onClick={()=>handleSubmit()}
        >
          Submit Loan Application
        </Button>
      </motion.div>
    </div>
  );
};

export default CollateralInfo;
