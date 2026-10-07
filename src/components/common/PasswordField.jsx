import { useId, useState } from "react";

export default function PasswordField({ label, value, onChange, autoComplete, name }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <label htmlFor={id} className="block text-sm text-[#241B1D]">
      {label}
      <span className="relative mt-1.5 block">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="h-12 w-full rounded-full border border-[#E9D8C5] bg-[#FFFDFC] pr-28 pl-4 text-base outline-none focus:border-[#781829]"
        />
        <button
          type="button"
          onClick={() => setVisible((open) => !open)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Unhide password"}
          className="absolute top-1/2 right-1.5 flex h-10 -translate-y-1/2 items-center gap-1 rounded-full px-2.5 text-[11px] tracking-[0.08em] text-[#4B0F1B] uppercase"
        >
          <span className="material-symbols-outlined text-[20px]">{visible ? "visibility_off" : "visibility"}</span>
          {visible ? "Hide" : "Unhide"}
        </button>
      </span>
    </label>
  );
}
