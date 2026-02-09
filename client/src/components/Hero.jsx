import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            dispatch(getProfile());
        }
    }, [dispatch, user]);

    const isLight = user?.theme === 'light';

    if (loading) return <p>Loading profile...</p>;
    return (
        <>
            <div
                className={`
    flex flex-col items-center justify-center
    p-6 sm:p-10 lg:p-16
    mx-auto max-w-7xl
    ${isLight
                        ? "bg-[transparent]"
                        : "relative bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020617]"
                    }
  `}
            >
                {/* subtle glow for dark theme */}
                {!isLight && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[160px]" />
                        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-cyan-400/20 blur-[140px]" />
                    </div>
                )}

                {/* Headings */}
                <motion.h1
                    className={`
      relative z-10 font-inter font-semibold
      text-5xl sm:text-6xl md:text-7xl lg:text-8xl
      text-center mb-4
      ${isLight
                            ? "text-black"
                            : "bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent"
                        }
    `}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Organize Your
                </motion.h1>

                <motion.h1
                    className={`
      relative z-10 font-inter font-semibold
      text-5xl sm:text-6xl md:text-7xl lg:text-8xl
      text-center mb-6
      ${isLight
                            ? "text-black"
                            : "bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent"
                        }
    `}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Code <span className={isLight ? "text-[#3E9DE6]" : ""}>Snippets</span>
                </motion.h1>

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className={`
      relative z-10
      mt-4 mb-10
      px-6 sm:px-8 py-3 sm:py-4
      rounded-2xl font-inter font-semibold
      text-lg sm:text-xl
      transition-all duration-300
      ${isLight
                            ? "bg-black text-white hover:bg-zinc-800"
                            : `
            bg-gradient-to-r from-indigo-600 to-cyan-500
            text-white
            shadow-[0_0_30px_rgba(99,102,241,0.45)]
            hover:shadow-[0_0_45px_rgba(34,211,238,0.6)]
          `
                        }
    `}
    onClick={() => navigate("/dashboard")}
                >
                    Get Started
                </motion.button>

                {/* Hero Image */}
                <motion.img
                    src="hero4.png"
                    alt="Snippify Hero"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`
      relative z-10
      w-full max-w-5xl
      h-auto
      rounded-xl
      ${isLight
                            ? "shadow-lg"
                            : "shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/5"
                        }
    `}
                />
            </div>
        </>
    )
}