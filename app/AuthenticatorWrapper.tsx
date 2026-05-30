"use client"

import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";

export default function AuthenticatorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMock, setIsMock] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signUp"); // Default to Create Account like in user image
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMock(outputs.data?.url?.includes("example.com") ?? true);
    setIsLoggedIn(localStorage.getItem("mock_logged_in") === "true");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isMock) {
    if (isLoggedIn) {
      return (
        <Authenticator.Provider>
          {children}
        </Authenticator.Provider>
      );
    }

    const handleAuth = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) {
        setError("Email is required");
        return;
      }
      if (!password) {
        setError("Password is required");
        return;
      }
      if (activeTab === "signUp") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
      }
      localStorage.setItem("mock_logged_in", "true");
      setIsLoggedIn(true);
      window.location.reload();
    };

    return (
      <div className="login-container">
        <style>{`
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
        `}</style>
        
        <div className="login-card">
          <div className="tab-header">
            <button 
              type="button"
              className={`tab-button ${activeTab === "signIn" ? "active" : "inactive"}`}
              onClick={() => { setActiveTab("signIn"); setError(""); }}
            >
              Sign In
            </button>
            <button 
              type="button"
              className={`tab-button ${activeTab === "signUp" ? "active" : "inactive"}`}
              onClick={() => { setActiveTab("signUp"); setError(""); }}
            >
              Create Account
            </button>
          </div>

          <form className="form-container" onSubmit={handleAuth}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="renbran+1@amazon.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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

            {activeTab === "signUp" && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
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

            <button type="submit" className="submit-button">
              {activeTab === "signIn" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Authenticator.Provider>
      <Authenticator>{children}</Authenticator>
    </Authenticator.Provider>
  );
}