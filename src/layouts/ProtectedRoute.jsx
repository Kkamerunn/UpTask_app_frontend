import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const loading = useSelector(state => state.authentication.loading)
    const auth = useSelector(state => state.authentication.auth)

    if (loading) return 'loading...'

    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="p-10 flex-1">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute;