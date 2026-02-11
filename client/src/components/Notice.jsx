import { motion } from "framer-motion";
import { ShieldCheck, KeyRound, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GeminiApiNotice = ({ isLight }) => {
const navigate = useNavigate();

return (
<section
className={`         relative overflow-hidden font-inter
        px-6 sm:px-10 lg:px-20 py-20
        ${
          isLight
            ? "bg-[#FFFDF1]"
            : "bg-[#020617]"
        }
      `}
> <div className="max-w-6xl mx-auto">
{/* Header */} <div className="text-center max-w-3xl mx-auto mb-14">
<motion.h2
initial={{ opacity: 0, y: 25 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
className={`               text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight
              ${isLight ? "text-[#562F00]" : "text-white"}
            `}
>
Unlock AI Code Explanations
</motion.h2>

      <p
        className={`
          mt-4 text-base sm:text-lg
          ${isLight ? "text-[#7A4A12]" : "text-zinc-400"}
        `}
      >
        Add your Gemini API key in your profile to enable intelligent
        explanations for your saved code snippets.
      </p>
    </div>

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-2xl p-6 sm:p-8 lg:p-10
        flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8
        ${
          isLight
            ? "bg-[#EABF8C] border border-[#D8A56A]"
            : "bg-white/5 border border-white/10"
        }
      `}
    >
      {/* Left Content */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div
          className={`
            p-4 rounded-xl
            ${
              isLight
                ? "bg-[#FF8F3C]"
                : "bg-indigo-600/20"
            }
          `}
        >
          <Sparkles
            size={28}
            className={isLight ? "text-white" : "text-indigo-400"}
          />
        </div>

        <div>
          <h3
            className={`
              text-xl sm:text-2xl font-semibold mb-2
              ${isLight ? "text-[#562F00]" : "text-white"}
            `}
          >
            Enable Gemini in Profile
          </h3>

          <p
            className={`
              text-sm sm:text-base max-w-xl
              ${isLight ? "text-[#5C3A0A]" : "text-zinc-400"}
            `}
          >
            To use the AI explain feature, add your personal Gemini API key
            from the Profile section. Your key is encrypted and securely
            stored in the database — it is never exposed on the client.
          </p>

          {/* Security line */}
          <div
            className={`
              flex items-center gap-2 mt-3 text-sm
              ${isLight ? "text-[#5C3A0A]" : "text-zinc-500"}
            `}
          >
            <ShieldCheck size={16} />
            Secure • Encrypted • Private
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => navigate("/profile")}
        className={`
          flex items-center gap-2
          px-6 py-3 rounded-xl font-semibold text-base transition-all
          ${
            isLight
              ? "bg-[#562F00] text-[#FFCE99] hover:bg-[#3f2200]"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }
        `}
      >
        <KeyRound size={18} />
        Add API Key
      </motion.button>
    </motion.div>
  </div>
</section>

);
};

export default GeminiApiNotice;
