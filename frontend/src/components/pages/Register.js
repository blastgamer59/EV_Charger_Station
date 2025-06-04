import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useUserAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Step 1: Register user with Firebase
      await signUp(formData.email, formData.password);

      // Step 2: Send user data to MongoDB
      const response = await fetch("https://ev-charger-station.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Step 3: Navigate to home page after successful registration
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setErrors({ submit: error.message || "Registration failed" });
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to manage your EV charging stations
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}
            <div className="space-y-4">
              <Input
                label="Full name"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                icon={<User size={20} />}
                placeholder="Enter your full name"
                error={errors.name}
                autoComplete="name"
              />

              <Input
                label="Email address"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={20} />}
                placeholder="Enter your email"
                error={errors.email}
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock size={20} />}
                placeholder="Create a password"
                error={errors.password}
                autoComplete="new-password"
              />

              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock size={20} />}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={<UserPlus size={20} />}
            >
              Create account
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
