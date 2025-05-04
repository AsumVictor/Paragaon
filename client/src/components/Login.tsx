import { AuthFormData, FormErrors } from "@/types/auth";
import { validateEmail, validatePassword } from "@/utils/validation";
import React, { useState } from "react";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();

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

    try {
      const { success, message } = await login(
        formData.email,
        formData.password
      );

      if (!success) {
        throw new Error(message);
      }

      navigate("/");
    } catch (error) {
      setErrors({
        general: error.message,
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Get Started</h1>
      <p className="text-gray-600 mb-8">
        Welcome to Paragon - Let's create your account
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
          placeholder="hi@Paragon.com"
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

        <div className=" mt-5">
          <p>Admin Users:</p>
          <p> email: effuah.maame@paragon.com | password: risk@123</p>
        </div>

        <div className=" mt-5">
          <p>Collector Users:</p>
          <p> email: john.doe@paragon.com | password: collector@123</p>
        </div>

        <div className=" mt-5">
          <p>Credit Managers:</p>
          <p> email: Owerku.Bamsah@paragon.com | password: risk@123</p>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
