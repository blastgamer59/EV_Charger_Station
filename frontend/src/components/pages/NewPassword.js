import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const location = useLocation();
  const [oobCode, setOobCode] = useState("");

  // Extract and validate oobCode
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setError("Invalid or missing reset code");
      setSnackbarMessage("Invalid or missing reset code");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [location]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const auth = getAuth();
      // Verify the reset code
      await verifyPasswordResetCode(auth, oobCode);
      // Reset the password
      await confirmPasswordReset(auth, oobCode, password);

      setIsSubmitted(true);
      setSnackbarMessage("Password reset successfully. You can now log in.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      let errorMessage = "An error occurred. Please try again.";
      if (err.code === "auth/invalid-action-code") {
        errorMessage = "Invalid or expired reset link. Please request a new one.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      }
      setSnackbarMessage(errorMessage);
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
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below to reset your account password.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <div className="rounded-md bg-green-50 p-4 mb-4">
                <p className="text-sm text-green-700">
                  Your password has been reset successfully. You will be redirected to the login page.
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
                label="New Password"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                icon={<Lock size={20} />}
                placeholder="Enter your new password"
                error={error}
                autoComplete="new-password"
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                icon={<Lock size={20} />}
                placeholder="Confirm your new password"
                error={error}
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                disabled={!oobCode}
              >
                Reset Password
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

export default NewPassword;