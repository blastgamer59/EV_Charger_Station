import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if email is registered
      const response = await fetch("https://ev-charger-station.onrender.com/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.registered) {
        setSnackbarMessage("No account found with this email address");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsLoading(false);
        return;
      }

      // Send password reset email
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email, {
        url: "https://evchargerstation.vercel.app/login",
        handleCodeInApp: true // This makes the link open in your app
      });

      setIsSubmitted(true);
      setSnackbarMessage("Password reset link have been sent to your email");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error:", err);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-green-600 hover:text-green-500"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you link to reset
              your password.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <div className="rounded-md bg-green-50 p-4 mb-4">
                <p className="text-sm text-green-700">
                  Password reset link have been sent to your email.
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <Link to="/login">
                <Button variant="primary" size="lg" fullWidth>
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email address"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                icon={<Mail size={20} />}
                placeholder="Enter your email"
                error={error}
                autoComplete="email"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Send Reset Instructions
              </Button>
            </form>
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "75%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default ForgotPassword;
