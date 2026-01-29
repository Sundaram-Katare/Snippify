import { motion } from "framer-motion";

export default function Features() {
    return (
        <>
         <div className="m-8 p-4 bg-transparent">
           <div className="grid grid-cols-2 gap-20">

            <div className="flex flex-col font-poppins">
               <h1>Code Editor</h1>

               <p>In built code editor to write your snippets specific to the language</p>
            </div>

            <div className="flex justify-center items-center">
                <motion.div className="bg-[url(https://i.pinimg.com/originals/8d/62/1f/8d621f66f551b6a39072473d52280ff0.gif)] h-80 w-80 rounded-md relative"
                            initial={{ z: -10 }}
                            animate={{  z: 0 }}
                            transition={{ duration: 1 }}
                >
                    {/* <img src="https://i.pinimg.com/originals/8d/62/1f/8d621f66f551b6a39072473d52280ff0.gif" alt="" /> */}
                   <motion.div className="bg-green-500 h-80 w-80 rounded-md absolute z-[-2] top-4 left-4"
                               initial={{ z: -10 }}
                            animate={{  z: 0 }}
                            transition={{ duration: 1 }}
                   >
                     
                   </motion.div>
                </motion.div>
            </div>

           </div>
         </div>
        </>
    )
}