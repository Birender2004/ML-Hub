import {
  BookOpen,
  Clapperboard,
  History,
  LayoutDashboard,
  MailWarning,
  Shirt,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Spam Classifier", to: "/spam-classifier", icon: MailWarning },
  { label: "Movies", to: "/movie-recommendation", icon: Clapperboard },
  { label: "Books", to: "/book-recommendation", icon: BookOpen },
  { label: "Fashion", to: "/fashion-recommendation", icon: Shirt },
  { label: "History", to: "/prediction-history", icon: History },
  { label: "Profile", to: "/profile", icon: User },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-white/10 lg:bg-surface-900/90 lg:px-5 lg:py-6 lg:backdrop-blur">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400 text-surface-950 shadow-glow">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-normal text-white">ML Hub</p>
          <p className="text-xs text-slate-400">AI workflow console</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-cyan-400/12 text-cyan-200 ring-1 ring-cyan-300/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
