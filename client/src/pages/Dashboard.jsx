import { useDispatch, useSelector } from "react-redux";
import AddComponent from "../components/AddComponent";
import Catolouge from "../components/Catolouge";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { getProfile } from "../features/auth/authSlice";


export default function Dashboard() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(getProfile());
        }
    }, [dispatch, user]);


    if (loading) return <p>Loading profile...</p>;
    return (
        <>
            <div className="flex flex-col md:flex-row gap-2 min-h-screen justify-center p-16 ">
                {/* <Sidebar />
                {/* <Catolouge /> */}
                {/* <AddComponent /> */}

                <h1 className="text-6xl font-pacifico font-semibold text-black text-center">
                   Hello {user?.name}
                </h1>

            </div>
        </>
    )
}