import Features from "../components/Features.jsx"
import Hero from "../components/Hero.jsx"
import Insights from "../components/Insights.jsx"
import Navbar from "../components/Navbar.jsx"

export default function Home() {
    return (
        <>
            <div className="bg-gradient-to-b from-white to-blue-100">
                <Navbar />
                <Hero />
                {/* <Features /> */}
                <Insights />
            </div>
        </>
    )
}