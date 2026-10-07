import { useState } from "react";
import { api } from "../../api/client";
import PasswordField from "../../components/common/PasswordField";

export default function AdminPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (newPassword !== confirm) {
      setError("New password and confirmation do not match.");
      return;
    }
    setPending(true);
    try {
      const data = await api("/api/auth/password", {
        method: "PUT",
        auth: true,
        body: { currentPassword, newPassword },
      });
      setMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-4 sm:max-w-lg sm:p-6">
      <h1 className="font-headline-sm text-2xl text-[#4B0F1B]">Change password</h1>
      <p className="mt-2 text-sm leading-6 break-words text-[#241B1D]/70">The new password is saved for sign-in and sent to venkataniharbillakurthi@gmail.com.</p>
      <div className="mt-5 space-y-4">
        <PasswordField label="Current password" name="current-password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
        <PasswordField label="New password" name="new-password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        <PasswordField label="Confirm new password" name="confirm-password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
      </div>
      {error ? <p className="mt-4 text-sm text-[#781829]">{error}</p> : null}
      {message ? <p className="mt-4 text-sm break-words text-[#4B0F1B]">{message}</p> : null}
      <button type="submit" disabled={pending} className="mt-6 h-12 w-full cursor-pointer rounded-full bg-[#781829] px-6 text-xs tracking-[0.14em] text-[#FFFDFC] uppercase disabled:opacity-40 sm:w-auto">
        {pending ? "Saving" : "Update password"}
      </button>
    </form>
  );
}
