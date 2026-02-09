import { motion } from "framer-motion";

const ProSnippetManagement = ({ isLight }) => {
  return (
    <section
      className={`
        relative overflow-hidden font-inter
        px-6 sm:px-10 lg:px-20 py-24
        ${
          isLight
            ? "bg-[#FFFDF1]"
            : "bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020617]"
        }
      `}
    >
      {/* Dark theme ambient glow */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
          <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-cyan-400/20 blur-[140px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`
              text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight
              ${
                isLight
                  ? "text-black"
                  : "bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent"
              }
            `}
          >
            Manage Your Snippets Like a Pro
          </motion.h2>

          <p
            className={`
              mt-5 text-lg sm:text-xl
              ${
                isLight
                  ? "text-gray-600"
                  : "text-zinc-400"
              }
            `}
          >
            Stop hunting through repos and notes.  
            Organize, search, and reuse your code with precision and speed.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Organization",
              desc: "Group snippets by language, tags, or use-case so everything stays exactly where you expect.",
              icon: "📂",
            },
            {
              title: "Instant Search",
              desc: "Find any snippet in milliseconds — even from thousands — with blazing-fast search.",
              icon: "⚡",
            },
            {
              title: "Always in Sync",
              desc: "Your snippets are available everywhere you code, whenever you need them.",
              icon: "🔄",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`
                p-6 rounded-2xl transition-all
                ${
                  isLight
                    ? "bg-white border border-gray-200 shadow-sm"
                    : "bg-white/5 backdrop-blur border border-white/10 hover:border-indigo-500/40"
                }
              `}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3
                className={`
                  text-xl font-semibold mb-2
                  ${isLight ? "text-black" : "text-white"}
                `}
              >
                {item.title}
              </h3>
              <p className={isLight ? "text-gray-600" : "text-zinc-400"}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <button
            className={`
              px-8 py-4 rounded-2xl font-semibold text-lg transition-all
              ${
                isLight
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
            Start Managing Smarter
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProSnippetManagement;
