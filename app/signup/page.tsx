"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/auth-context";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = searchParams?.get("redirect") || "/";

  // ✅ FIXED: async + await signup()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const result = await signup(name, email, password); // ✅ was missing await
    setSubmitting(false);

    if (!result.success) {
      setError(result.error || "Something went wrong.");
      return;
    }

    router.push(redirectTo);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; }
        .auth-wrap {
          min-height: 100vh; display: flex; align-items: center;
          justify-content: center; background: #f4f3ef; padding: 24px;
        }
        .auth-card {
          display: grid; grid-template-columns: 1fr 1fr;
          max-width: 1000px; width: 100%; background: #fff;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
        }
        .auth-image { background-size: cover; background-position: center; min-height: 620px; }
        .auth-form-col { padding: 48px 56px; display: flex; flex-direction: column; justify-content: center; }
        .auth-title { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 6px; }
        .auth-sub { font-size: 13px; color: #888; margin-bottom: 24px; }
        .auth-field { margin-bottom: 16px; }
        .auth-label { font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #888; text-transform: uppercase; margin-bottom: 8px; display: block; }
        .auth-input-wrap { position: relative; }
        .auth-input {
          width: 100%; padding: 12px 14px; font-size: 14px;
          border: 1px solid #e0ddd4; border-radius: 8px;
          background: #fafaf8; color: #1a1a1a; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .auth-input:focus { border-color: #4a7c59; box-shadow: 0 0 0 3px rgba(74,124,89,0.12); background: #fff; }
        .auth-eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #999; display: flex; }
        .auth-error { background: #fdecec; color: #b3382c; font-size: 12px; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; }
        .auth-submit { width: 100%; padding: 14px; margin-top: 8px; background: #1f3b22; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .auth-submit:hover { background: #16291a; }
        .auth-submit:disabled { opacity: 0.6; cursor: default; }
        .auth-divider { display: flex; align-items: center; gap: 12px; margin: 22px 0; color: #aaa; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
        .auth-divider::before, .auth-divider::after { content: ""; flex: 1; height: 1px; background: #e8e6dd; }
        .auth-social-label { text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #999; margin-bottom: 12px; }
        .auth-social-row { display: flex; justify-content: center; gap: 12px; margin-bottom: 24px; }
        .auth-social-btn { width: 42px; height: 42px; border-radius: 10px; border: 1px solid #e6e4dc; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: border-color 0.15s, transform 0.15s; }
        .auth-social-btn:hover { border-color: #4a7c59; transform: translateY(-1px); }
        .auth-footer-text { text-align: center; font-size: 13px; color: #777; }
        .auth-footer-link { color: #2d4a2d; font-weight: 700; text-decoration: none; }
        .auth-footer-link:hover { text-decoration: underline; }
        .auth-legal { text-align: center; margin-top: 24px; font-size: 11px; color: #aaa; }
        .auth-legal a { color: #aaa; text-decoration: none; margin: 0 8px; }
        .auth-legal a:hover { color: #777; text-decoration: underline; }
        @media (max-width: 800px) {
          .auth-card { grid-template-columns: 1fr; }
          .auth-image { display: none; }
          .auth-form-col { padding: 40px 28px; }
        }
      `}</style>

      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80')" }} />
          <div className="auth-form-col">
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-sub">Create an account to start shopping consciously.</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="name">Full Name</label>
                <input id="name" className="auth-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="email">Email</label>
                <input id="email" className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="password">Password</label>
                <div className="auth-input-wrap">
                  <input id="password" className="auth-input" type={showPassword ? "text" : "password"} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className="auth-eye" onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="confirm">Confirm Password</label>
                <input id="confirm" className="auth-input" type={showPassword ? "text" : "password"} placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>

              <button className="auth-submit" type="submit" disabled={submitting}>
                {submitting ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <div className="auth-divider">OR</div>
            <p className="auth-social-label">SIGN UP WITH</p>
            <div className="auth-social-row">
              <button className="auth-social-btn" type="button">🔍</button>
              <button className="auth-social-btn" type="button">in</button>
              <button className="auth-social-btn" type="button">𝕏</button>
            </div>

            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link className="auth-footer-link" href="/login">LOG IN</Link>
            </p>
            <div className="auth-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}