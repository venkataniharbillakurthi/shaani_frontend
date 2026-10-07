import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../../constants/site";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shaani"
      title="Chat with Shaani"
      className="fixed right-4 bottom-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#781829] text-[#FFFDFC] shadow-lg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <span className="material-symbols-outlined">chat</span>
    </motion.a>
  );
}
