import { useEffect, useState } from "react";
import { api } from "../../api/client";

function formatWhen(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const data = await api("/api/admin/messages", { auth: true });
    setMessages(data);
  };

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  const remove = async (message) => {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return;
    setBusyId(message.id);
    setError("");
    try {
      await api(`/api/admin/messages/${message.id}`, { method: "DELETE", auth: true });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="font-headline-sm text-3xl text-[#4B0F1B]">Messages</h1>
      <p className="mt-1 text-sm text-[#241B1D]/70">Contact form messages are saved here and sent to the Shaani Gmail.</p>
      {error ? <p className="mt-4 text-sm text-[#781829]">{error}</p> : null}
      <div className="mt-5 grid gap-3">
        {messages.length === 0 ? <p className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] px-4 py-10 text-center text-sm text-[#241B1D]/70">No messages yet.</p> : null}
        {messages.map((message) => (
          <article key={message.id} className="rounded-3xl border border-[#E9D8C5] bg-[#FFFDFC] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="font-headline-sm text-lg text-[#4B0F1B]">{message.subject}</p>
                <p className="mt-1 text-sm break-words">{message.name} · {message.phone}</p>
                <p className="text-sm break-all text-[#241B1D]/70">{message.email}</p>
                <p className="mt-1 text-xs text-[#241B1D]/60">{formatWhen(message.createdAt)}</p>
              </div>
              <button
                type="button"
                disabled={busyId === message.id}
                onClick={() => remove(message)}
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-[#781829] px-4 text-xs tracking-[0.12em] text-[#781829] uppercase disabled:opacity-40"
              >
                Delete
              </button>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 break-words">{message.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
