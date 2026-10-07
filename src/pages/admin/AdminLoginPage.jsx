import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PasswordField from "../../components/common/PasswordField";
import Seo from "../../components/seo/Seo";
import { LOGO_SRC } from "../../constants/site";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLoginPage() {
  const { username, ready, login } = useAdminAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (!ready) return null;
  if (username) return <Navigate to="/admin" replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await login(name, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F3ED] px-4">
      <Seo title="Admin sign in | Shaani Clothing" description="Sign in to the Shaani Clothing admin panel." path="/admin/login" noIndex />
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-5 sm:p-8">
        <img src={LOGO_SRC} alt="Shaani Clothing" className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-[#C5A04A] shadow-[0_6px_18px_rgba(75,15,27,0.18)]" />
        <h1 className="mt-4 text-center font-headline-sm text-3xl text-[#4B0F1B]">Admin sign in</h1>
        <label className="mt-6 block text-sm">
          Username
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="username" className="mt-1 h-12 w-full rounded-full border border-[#E9D8C5] px-4 text-base outline-none focus:border-[#781829]" />
        </label>
        <div className="mt-4">
          <PasswordField label="Password" name="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {error ? <p className="mt-4 text-sm text-[#781829]">{error}</p> : null}
        <button type="submit" disabled={pending} className="mt-6 h-11 w-full cursor-pointer rounded-full bg-[#781829] text-xs tracking-[0.14em] text-[#FFFDFC] uppercase disabled:opacity-40">
          {pending ? "Signing in" : "Sign in"}
        </button>
        <Link to="/" className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center rounded-full border border-[#E9D8C5] text-xs tracking-[0.14em] text-[#4B0F1B] uppercase">
          Home
        </Link>
      </form>
    </div>
  );
}
