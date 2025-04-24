import { AuthFormData, FormErrors } from "@/types/auth";
import { validateEmail, validatePassword } from "@/utils/validation";
import React, { useState } from "react";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
    } catch (error) {
      setErrors({
        general: "Failed to log in. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Get Started</h1>
      <p className="text-gray-600 mb-8">
        Welcome to Filianta - Let's create your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="hi@filianta.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Forgot?
            </button>
          </div>
          <Input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
