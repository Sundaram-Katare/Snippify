import Features from "../components/Features.jsx"
import Hero from "../components/Hero.jsx"
import Insights from "../components/Insights.jsx"
import Navbar from "../components/Navbar.jsx"

export default function Home() {
    return (
        <>
            <div className="bg-[#FFE5FA]">
                {/* <Navbar toggleSidebar={toggleSidebar} /> */}
                <Hero />
                {/* <Features /> */}
                <Insights />
            </div>
        </>
    )
}