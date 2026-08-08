import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../UI/Loader.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-950 text-slate-100">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-surface-950 text-slate-100">
      <Sidebar />
      <div className="min-h-screen lg:pl-72">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
