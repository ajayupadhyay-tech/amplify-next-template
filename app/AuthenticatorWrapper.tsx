"use client"

import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";

function InnerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMock, setIsMock] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp" | "forgotPassword">("signUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    setIsMock(outputs.data?.url?.includes("example.com") ?? true);
    setIsLoggedIn(localStorage.getItem("mock_logged_in") === "true");
    
    // Prepopulate a default mock user for easy sign-in testing
    const existingUsers = localStorage.getItem("mock_users");
    if (!existingUsers) {
      localStorage.setItem(
        "mock_users",
        JSON.stringify([
          { email: "renbran+1@amazon.com", password: "password" }
        ])
      );
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const loginStyles = `
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(to bottom, #8a6ef5 0%, #b8a2f8 40%, #f3f4f6 100%);
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 1rem;
    }
    .login-card {
      background: #ffffff;
      border-radius: 0px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 460px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid #e2e8f0;
    }
    .tab-header {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
    }
    .tab-button {
      flex: 1;
      padding: 1.1rem 0;
      background: none;
      border: none;
      border-top: 3px solid transparent;
      font-size: 0.95rem;
      font-weight: 700;
      color: #045b73;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
    }
    .tab-button.inactive {
      color: #64748b;
      font-weight: 500;
    }
    .tab-button.active {
      border-top: 3px solid #00a4b4; /* Teal top line */
      color: #045b73;
      font-weight: 700;
    }
    .form-container {
      padding: 2rem 2.5rem 2.5rem 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
      text-align: left;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .form-input {
      width: 100%;
      padding: 0.65rem 0.85rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
      color: #1e293b;
    }
    .form-input:focus {
      border-color: #045b73;
    }
    .toggle-password {
      position: absolute;
      right: 0px;
      height: 100%;
      width: 3rem;
      background: none;
      border: none;
      border-left: 1px solid #cbd5e1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
    }
    .toggle-password:hover {
      color: #045b73;
    }
    .submit-button {
      width: 100%;
      padding: 0.8rem;
      background-color: #045b73;
      color: #ffffff;
      border: 1px solid #034e62;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 0.5rem;
    }
    .submit-button:hover {
      background-color: #034a5d;
    }
    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      text-align: left;
      margin-bottom: 0.5rem;
    }
    .success-message {
      color: #10b981;
      font-size: 0.85rem;
      text-align: left;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    /* AWS Amplify UI Styling Overrides */
    [data-amplify-authenticator] {
      --amplify-colors-brand-primary-80: #045b73;
      --amplify-colors-brand-primary-90: #034e62;
      --amplify-colors-brand-primary-100: #034a5d;
      --amplify-components-button-primary-background-color: #045b73;
      --amplify-components-button-primary-hover-background-color: #034a5d;
      --amplify-radii-medium: 4px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    
    [data-amplify-authenticator] [data-amplify-router],
    [data-amplify-authenticator] .amplify-authenticator__router {
      background: #ffffff !important;
      border-radius: 0px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
      width: 100% !important;
      max-width: 460px !important;
      border: 1px solid #e2e8f0 !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
    }
    
    [data-amplify-authenticator] ul,
    [data-amplify-authenticator] li {
      border: none !important;
      background-color: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      border-radius: 0 !important;
      list-style-type: none !important;
      display: flex !important;
      overflow: visible !important;
      width: auto !important;
      box-shadow: none !important;
    }
    
    [data-amplify-authenticator] .amplify-tabs {
      border-bottom: 1px solid #e2e8f0 !important;
      display: flex !important;
      width: 100% !important;
    }
    
    [data-amplify-authenticator] .amplify-tabs__item {
      flex: 1 !important;
      padding: 1.1rem 0 !important;
      background: none !important;
      border: none !important;
      border-top: 3px solid transparent !important;
      border-bottom: none !important;
      font-size: 0.95rem !important;
      font-weight: 500 !important;
      color: #64748b !important;
      cursor: pointer !important;
      text-align: center !important;
      transition: all 0.2s ease !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    
    [data-amplify-authenticator] .amplify-tabs__item[data-state="active"] {
      border-top: 3px solid #00a4b4 !important;
      border-bottom: none !important;
      color: #045b73 !important;
      font-weight: 700 !important;
    }
    
    [data-amplify-authenticator] .amplify-form {
      padding: 2rem 2.5rem 2.5rem 2.5rem !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 1.25rem !important;
      background: #ffffff !important;
    }
    
    [data-amplify-authenticator] .amplify-label {
      font-size: 0.85rem !important;
      font-weight: 600 !important;
      color: #475569 !important;
      margin-bottom: 0.4rem !important;
      text-align: left !important;
    }
    
    [data-amplify-authenticator] .amplify-field-group__control input {
      border: 1px solid #cbd5e1 !important;
      border-radius: 4px !important;
      font-size: 0.95rem !important;
      padding: 0.65rem 0.85rem !important;
      color: #1e293b !important;
      background: #ffffff !important;
      height: auto !important;
    }
    
    [data-amplify-authenticator] .amplify-field-group__control input:focus {
      border-color: #045b73 !important;
      box-shadow: none !important;
    }
    
    [data-amplify-authenticator] .amplify-field-group__outer {
      margin-bottom: 0px !important;
    }
    
    [data-amplify-authenticator] .amplify-field-group__control button {
      background: none !important;
      border: none !important;
      color: #94a3b8 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      padding: 0 1rem !important;
      height: 100% !important;
    }
    
    [data-amplify-authenticator] .amplify-field-group__control button:hover {
      color: #045b73 !important;
    }
    
    [data-amplify-authenticator] .amplify-button[data-variation="primary"] {
      background-color: #045b73 !important;
      border: 1px solid #034e62 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      font-size: 0.95rem !important;
      padding: 0.8rem !important;
      border-radius: 4px !important;
      box-shadow: none !important;
      width: 100% !important;
      margin-top: 0.5rem !important;
    }
    
    [data-amplify-authenticator] .amplify-button[data-variation="primary"]:hover {
      background-color: #034a5d !important;
    }
    
    [data-amplify-authenticator] .amplify-button[data-variation="link"] {
      color: #045b73 !important;
      font-weight: 600 !important;
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0.5rem 0 !important;
      font-size: 0.9rem !important;
      text-decoration: none !important;
    }
    
    [data-amplify-authenticator] .amplify-button[data-variation="link"]:hover {
      color: #034a5d !important;
      text-decoration: underline !important;
    }
    
    [data-amplify-authenticator] .amplify-heading {
      color: #045b73 !important;
      font-weight: 700 !important;
      margin-bottom: 1rem !important;
      text-align: left !important;
    }
    
    [data-amplify-authenticator] .amplify-text--error {
      color: #ef4444 !important;
      font-size: 0.85rem !important;
      text-align: left !important;
    }
  `;

  if (isMock) {
    if (isLoggedIn) {
      return <>{children}</>;
    }

    const handleAuth = (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");

      if (!email) {
        setError("Email is required");
        return;
      }

      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");

      if (activeTab === "signUp") {
        if (!password) {
          setError("Password is required");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        
        const userExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
          setError("User already exists");
          return;
        }

        // Create new account
        users.push({ email, password });
        localStorage.setItem("mock_users", JSON.stringify(users));
        localStorage.setItem("mock_logged_in", "true");
        setIsLoggedIn(true);
        window.location.reload();
      } else if (activeTab === "signIn") {
        if (!password) {
          setError("Password is required");
          return;
        }
        // Sign In
        const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (!user || user.password !== password) {
          setError("Incorrect username or password.");
          return;
        }

        localStorage.setItem("mock_logged_in", "true");
        setIsLoggedIn(true);
        window.location.reload();
      } else if (activeTab === "forgotPassword") {
        if (!resetCode) {
          setError("Verification code is required");
          return;
        }
        if (!password) {
          setError("New password is required");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        // Reset password action
        const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (userIndex === -1) {
          setError("User not found.");
          return;
        }

        users[userIndex].password = password;
        localStorage.setItem("mock_users", JSON.stringify(users));
        setSuccessMessage("Password reset successfully! You can now Sign In.");
        setActiveTab("signIn");
        setPassword("");
        setConfirmPassword("");
        setResetCode("");
      }
    };

    return (
      <div className="login-container">
        <style>{loginStyles}</style>
        
        <div className="login-card">
          {activeTab !== "forgotPassword" ? (
            <div className="tab-header">
              <button 
                type="button"
                className={`tab-button ${activeTab === "signIn" ? "active" : "inactive"}`}
                onClick={() => { setActiveTab("signIn"); setError(""); setSuccessMessage(""); }}
              >
                Sign In
              </button>
              <button 
                type="button"
                className={`tab-button ${activeTab === "signUp" ? "active" : "inactive"}`}
                onClick={() => { setActiveTab("signUp"); setError(""); setSuccessMessage(""); }}
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="tab-header">
              <div className="tab-button active" style={{ cursor: "default" }}>
                Reset Password
              </div>
            </div>
          )}

          <form className="form-container" onSubmit={handleAuth}>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="renbran+1@amazon.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={activeTab === "forgotPassword"}
              />
            </div>

            {activeTab === "forgotPassword" && (
              <div className="form-group">
                <label className="form-label">Verification Code (Sent to your email)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter any code (e.g. 123456)" 
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
              </div>
            )}

            {activeTab !== "forgotPassword" && (
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "3.5rem" }}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "forgotPassword" && (
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "3.5rem" }}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "signIn" && (
              <div style={{ textAlign: "right", marginTop: "-0.25rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    if (!email) {
                      setError("Please enter your email address first.");
                    } else {
                      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
                      const userExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
                      if (!userExists) {
                        setError("No registered account found with this email.");
                      } else {
                        setActiveTab("forgotPassword");
                        setPassword("");
                        setConfirmPassword("");
                        alert(`Mock Code Sent: A simulated password reset verification code has been generated for ${email}. You can now complete the password reset below.`);
                      }
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#045b73",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: 0,
                    boxShadow: "none"
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {(activeTab === "signUp" || activeTab === "forgotPassword") && (
              <div className="form-group">
                <label className="form-label">{activeTab === "forgotPassword" ? "Confirm New Password" : "Confirm Password"}</label>
                <div className="input-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="form-input" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingRight: "3.5rem" }}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "forgotPassword" && (
              <div style={{ textAlign: "left", marginTop: "-0.25rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signIn");
                    setError("");
                    setSuccessMessage("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: 0,
                    boxShadow: "none"
                  }}
                >
                  &larr; Back to Sign In
                </button>
              </div>
            )}

            <button type="submit" className="submit-button">
              {activeTab === "signIn" && "Sign In"}
              {activeTab === "signUp" && "Create Account"}
              {activeTab === "forgotPassword" && "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (authStatus === "authenticated") {
    return <>{children}</>;
  }

  return (
    <div className="login-container">
      <style>{loginStyles}</style>
      <Authenticator initialState="signUp" />
    </div>
  );
}

export default function AuthenticatorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator.Provider>
      <InnerWrapper>{children}</InnerWrapper>
    </Authenticator.Provider>
  );
}