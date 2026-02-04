import { useDispatch, useSelector } from "react-redux"
import Features from "../components/Features.jsx"
import Hero from "../components/Hero.jsx"
import Insights from "../components/Insights.jsx"
import Navbar from "../components/Navbar.jsx"
import { useEffect } from "react"
import { getProfile } from "../features/auth/authSlice.js"

export default function Home() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if(!user) {
            dispatch(getProfile());
        }
    }, [dispatch, user]);

    if (loading) return <p>Loading profile...</p>;

    return (
        <>
            <div className={`${user?.theme == "light" ? "bg-[#ffffff]" : "bg-[#000000]" } dark:bg-black`}>
                {/* <Navbar toggleSidebar={toggleSidebar} /> */}
                <Hero />
                {/* <Features /> */}
                <Insights />
            </div>
        </>
    )
}