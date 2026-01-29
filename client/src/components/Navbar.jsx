import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React, { useContext} from "react";
import AuthContext from "../context/AuthContext.jsx";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
         <nav className="flex flex-row justify-between px-4 py-6">
            <h1 className="text-4xl font-bold text-[#61B8FF] flex flex-row">Snippify</h1>

           { user ? `Hello` :(
            <button className="bg-[#61B8FF] text-gray-800 flex border rounded-2xl font-inter text-lg px-3 py-2 hover:scale-105 transition transform"
                    onClick={() => navigate("/auth")}
            >
                Get Started <MdArrowOutward />
            </button>
            )}
         </nav>
        </>
    )
}