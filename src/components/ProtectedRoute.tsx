
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isUserRegistered = () => {
  // Check if registration data is in localStorage
  try {
    const data = window.localStorage.getItem("demoUserRegistration");
    if (!data) return false;
    const parsed = JSON.parse(data);
    return parsed?.userId && parsed?.email && parsed?.password;
  } catch {
    return false;
  }
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (!isUserRegistered()) {
    // Redirect non-registered users to register page
    return <Navigate to="/register" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
