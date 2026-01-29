import { motion } from "framer-motion";

export default function Hero() {
    return (
        <>
         <div className="flex flex-col justify-center items-center p-8 m-4">
            <button className="px-2 py-2 rounded-2xl border border-t-2 shadow-md font-inter shadow-black max-w-fit cursor-none">
                Save it Once, Use it forever
            </button>
            <motion.h1 className="font-semibold text-8xl font-inter text-black text-center mb-4">Organize Your 
                <br />
                Code <span className="text-[#3E9DE6]">Snippets</span>
            </motion.h1>

            <p className="text-xl text-gray-600 font-semibold">From chaos to clarity —</p>
            <p className="text-xl text-gray-600 font-semibold">manage your snippets like a pro.</p>
         </div>
        </>
    )
}