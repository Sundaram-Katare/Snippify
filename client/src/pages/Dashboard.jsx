import AddComponent from "../components/AddComponent";
import Catolouge from "../components/Catolouge";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row gap-2">
                {/* <Sidebar /> */}
                {/* <Catolouge /> */}
                <AddComponent />
            </div>
        </>
    )
}