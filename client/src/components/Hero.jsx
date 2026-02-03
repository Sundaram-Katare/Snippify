import { motion } from "framer-motion";

export default function Hero() {
    return (
        <>
         <div className="flex flex-col justify-center bg-transparent items-center p-8 m-4">
            <button className="px-2 py-2 rounded-2xl border border-t-2 shadow-md font-inter shadow-black max-w-fit cursor-none">
                Save it Once, Use it forever
            </button>
            <motion.h1 className="font-semibold text-8xl font-inter text-black text-center mb-4"
                       initial={{ opacity: 0, x: -60 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8 }}
            >Organize Your 
            </motion.h1>

            <motion.h1 className="font-semibold text-8xl font-inter text-black text-center mb-4"
                       initial={{ opacity: 0, x: 60 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8 }}
            >Code <span className="text-[#3E9DE6]">Snippets</span> 
            </motion.h1>

            {/* <p className="text-xl text-gray-600 font-semibold">From chaos to clarity —</p>
            <p className="text-xl text-gray-600 font-semibold">manage your snippets like a pro.</p> */}
         <img src="hero3.png" alt="" className="rounded-lg h-[550px] " />

         <h2 className="font-inter text-black text-4xl font-semibold my-6">Ready to clear the chaos?</h2>

         <p className="font-regular text-center text-2xl font-inter">
            Join thousands of developers transforming
            <br />
             their workflow
         </p>

         <button className="flex my-6 justify-center items-center px-2 py-1 rounded-md text-4xl font-inter text-white bg-[#3E9DE6]">
            Join Now
         </button>
         </div>
        </>
    )
}