import {
  Activity,
  LogOut,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../components/UI/Card.jsx";
import PageHeader from "../components/UI/PageHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage account and workspace preferences."
      />

      <div className="grid gap-4 lg:grid-cols-3">

        {/* Main Account Card */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20">
              <User size={36} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Account
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-white">
                {user?.username || "ML Hub User"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {user?.email || "No email available"}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Authenticated
              </div>
            </div>
          </div>
        </Card>

        {/* Account Status */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Account Status
              </p>

              <p className="text-xs text-emerald-300">
                Active
              </p>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card className="lg:col-span-2">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Information associated with your ML Hub account.
            </p>
          </div>

          <div className="space-y-3">

            {/* Username */}
            <div className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-400">
                <User size={17} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Username
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {user?.username || "Not available"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-400">
                <Mail size={17} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {user?.email || "Not available"}
                </p>
              </div>
            </div>

            {/* User ID */}
            {user?.id && (
              <div className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-400">
                  <Activity size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    User ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {user.id}
                  </p>
                </div>
              </div>
            )}

          </div>
        </Card>

        {/* Security */}
        <Card>
          <h2 className="text-lg font-semibold text-white">
            Security
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Your ML Hub account is protected using JWT-based
            authentication.
          </p>

          <div className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={17}
                className="text-emerald-300"
              />

              <span className="text-sm font-medium text-emerald-300">
                Authentication active
              </span>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Card className="lg:col-span-3">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Sign out
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Sign out of your current ML Hub session.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/15"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </Card>

      </div>
    </>
  );
}