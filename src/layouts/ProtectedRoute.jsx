import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return "loading...";

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100 relative">
          <Header />
          <div className="md:flex md:min-h-screen mt-20">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
