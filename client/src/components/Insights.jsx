import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Insights() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // useEffect(() => {

    // })

    const isLight = user?.theme === 'light';

    return (
        <>
            <div
                className={`
    relative overflow-hidden font-inter
    px-6 sm:px-10 lg:px-20 py-20
    ${isLight
                        ? "bg-[#FFFDF1]"
                        : "bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020617]"
                    }
  `}
            >
                {/* Dark theme ambient glow */}
                {!isLight && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
                        <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-cyan-400/20 blur-[140px]" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h1
                            className={`
          font-bold tracking-tight
          text-4xl sm:text-5xl md:text-6xl
          ${isLight
                                    ? "text-black"
                                    : "bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent"
                                }
        `}
                        >
                            AI-Powered Code Insights
                        </h1>

                        <p
                            className={`
          mt-4 text-lg sm:text-xl max-w-3xl mx-auto
          ${isLight
                                    ? "text-gray-600"
                                    : "text-zinc-400"
                                }
        `}
                        >
                            Understand unfamiliar code instantly.
                            Get human-like explanations, logic breakdowns, and improvement hints — powered by AI.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Visual */}
                        <div className="relative flex justify-center">
                            <div
                                className={`
            relative rounded-2xl overflow-hidden
            ${isLight
                                        ? "shadow-xl"
                                        : "shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
                                    }
          `}
                            >
                                <img
                                    src="hero6.png"
                                    alt="AI Code Explanation"
                                    className="h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
                                />

                                {/* Overlay badge */}
                                <div
                                    className={`
              absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold
              ${isLight
                                            ? "bg-white/90 text-black"
                                            : "bg-black/60 text-white backdrop-blur border border-white/10"
                                        }
            `}
                                >
                                    AI Explanation
                                </div>
                            </div>
                        </div>

                        {/* Right: Textual Value */}
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Explain Any Code",
                                    desc: "Paste or select a snippet and let AI explain it line-by-line in simple language."
                                },
                                {
                                    title: "Think Like a Senior Engineer",
                                    desc: "Understand why the code exists, not just what it does."
                                },
                                {
                                    title: "Spot Improvements Instantly",
                                    desc: "AI highlights inefficiencies, edge cases, and cleaner approaches."
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`
              p-6 rounded-2xl transition
              ${isLight
                                            ? "bg-[#562F00] border border-gray-200"
                                            : "bg-white/5 backdrop-blur border border-white/10 hover:border-indigo-500/40"
                                        }
            `}
                                >
                                    <h3
                                        className={`
                text-xl font-semibold mb-2
                ${isLight
                                                ? "text-white"
                                                : "text-white"
                                            }
              `}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={
                                            isLight
                                                ? "text-[#FFCE99]"
                                                : "text-zinc-400"
                                        }
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            ))}

                            {/* CTA */}
                            <button
                                className={`
            mt-6 px-6 py-3 rounded-xl font-semibold transition-all
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
                            >
                                Try AI on Your Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}