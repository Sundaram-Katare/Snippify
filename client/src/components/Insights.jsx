import { motion } from "framer-motion";


export default function Insights() {
    return (
        <>
         <div className="p-8 m-16 font-inter relative">
            <div>
               <h1 className="text-6xl text-black font-bold font-inter">AI Powered Insights</h1>

               <h2 className="text-[#3E9DE6] font-semibold text-4xl">Read Code like a native speaker</h2>
            </div>

            <div className="relative grid grid-cols-2 gap-0 my-4">

                <div className="flex justify-center items-center my-4">
                   <img className="h-[500px] rounded-md" src="https://d5jbouauxtwah.cloudfront.net/eyJidWNrZXQiOiJrbm93bGVkZ2VodXQtcHJlcG8tbGl2ZSIsImtleSI6InR1dG9yaWFsc1wvdG9waWNzXC9pbWFnZXNcLzE2OTg0MDIzOTI4NTgtMTY5ODQwMjM5Mjg1OC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIifX19" alt="" />
                </div>

                <div className="flex justify-center items-center my-4">
                  <img className="h-[500px] rounded-md" src="https://d5jbouauxtwah.cloudfront.net/eyJidWNrZXQiOiJrbm93bGVkZ2VodXQtcHJlcG8tbGl2ZSIsImtleSI6InR1dG9yaWFsc1wvdG9waWNzXC9pbWFnZXNcLzE2OTg0MDIzOTI4NTgtMTY5ODQwMjM5Mjg1OC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIifX19" alt="" />
                </div>

            </div>

            <div className="absolute inset-0 bg-transparent flex justify-center items-center">
                <div className="relative h-40 w-40 rounded-full bg-yellow-400">
                    <h2 className="absolute inset-0">nn</h2>
                </div>
            </div>
         </div>
        </>
    )
}