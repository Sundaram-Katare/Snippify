import { FaJava } from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { FaCss3Alt } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { useState } from "react";

export default function LanguageBar() {
    const [current, setCurrent] = useState("All");

    const languages = [
        { name: "All", icon: null },
        { name: "Java", icon: <FaJava size={22} /> },
        { name: "Python", icon: <FaPython size={22} /> },
        { name: "Javascript", icon: <FaJs size={22} /> },
        { name: "C++", icon: <TbBrandCpp size={22} /> },
        { name: "CSS", icon: <FaCss3Alt size={22} /> },
    ];

    return (
        <div className="flex flex-row justify-evenly gap-20 items-center w-full px-4 py-3 rounded-md bg-black text-white font-inter">
            {languages.map((lang) => (
                <button
                    key={lang.name}
                    onClick={() => setCurrent(lang.name)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-200 
                        ${current === lang.name ? "bg-white text-black" : "hover:bg-gray-700"}`}
                >
                    {lang.icon}
                    <span>{lang.name}</span>
                </button>
            ))}
        </div>
    );
}
