import {
  Bell,
  Search,
  X,
  User,
  LayoutDashboard,
  MailWarning,
  Clapperboard,
  BookOpen,
  Shirt,
  History,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";

const searchItems = [
  {
    name: "Dashboard",
    description: "ML Hub overview and statistics",
    path: "/dashboard",
    icon: LayoutDashboard,
    keywords: ["dashboard", "home", "overview"],
  },
  {
    name: "Spam Classifier",
    description: "Classify messages as spam or legitimate",
    path: "/spam-classifier",
    icon: MailWarning,
    keywords: ["spam", "sms", "message", "classifier"],
  },
  {
    name: "Movie Recommendation",
    description: "Get personalized movie recommendations",
    path: "/movie-recommendation",
    icon: Clapperboard,
    keywords: ["movie", "movies", "film", "recommendation"],
  },
  {
    name: "Book Recommendation",
    description: "Discover books based on your preferences",
    path: "/book-recommendation",
    icon: BookOpen,
    keywords: ["book", "books", "reading", "recommendation"],
  },
  {
    name: "Fashion Recommendation",
    description: "Find visually similar fashion items",
    path: "/fashion-recommendation",
    icon: Shirt,
    keywords: ["fashion", "clothes", "clothing", "image", "recommendation"],
  },
  {
    name: "Prediction History",
    description: "View your previous predictions",
    path: "/prediction-history",
    icon: History,
    keywords: ["history", "predictions", "activity"],
  },
  {
    name: "Profile",
    description: "Manage your account",
    path: "/profile",
    icon: User,
    keywords: ["profile", "account", "user"],
  },
];

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  // --------------------------------------------------
  // Load recent predictions for notifications
  // --------------------------------------------------

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await api.get("/dashboard/stats");

        const recentPredictions =
          response.data?.recent_predictions || [];

        setNotifications(recentPredictions);
      } catch (error) {
        console.error(
          "Unable to load notifications:",
          error
        );
      }
    }

    loadNotifications();
  }, []);

  // --------------------------------------------------
  // Close dropdowns when clicking outside
  // --------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredItems = searchItems.filter((item) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    const searchableText = [
      item.name,
      item.description,
      ...item.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setShowSearchResults(true);
  }

  function handleSearchSelect(path) {
    navigate(path);
    setSearch("");
    setShowSearchResults(false);
  }

  function clearSearch() {
    setSearch("");
    setShowSearchResults(false);
  }

  // --------------------------------------------------
  // Notifications
  // --------------------------------------------------

  function handleNotificationClick() {
    setShowNotifications((current) => !current);
  }

  function openHistory() {
    navigate("/prediction-history");
    setShowNotifications(false);
  }

  function formatDate(date) {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-surface-950/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Workspace */}
        <div className="shrink-0">
          <p className="text-sm text-slate-400">
            Workspace
          </p>

          <h1 className="text-lg font-semibold text-white">
            ML Hub
          </h1>
        </div>

        <div className="flex items-center gap-3">

          {/* Search */}
          <div
            ref={searchRef}
            className="relative hidden md:block"
          >
            <div className="flex h-10 w-72 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-slate-400 transition focus-within:border-cyan-300/30 focus-within:bg-white/[0.07]">

              <Search size={17} />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (search.trim()) {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Search models, predictions..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-slate-500 transition hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Search results */}
            {showSearchResults && search.trim() && (
              <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-surface-900 shadow-2xl">

                {filteredItems.length > 0 ? (
                  <div className="p-2">

                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                      Results
                    </p>

                    {filteredItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.path}
                          type="button"
                          onClick={() =>
                            handleSearchSelect(item.path)
                          }
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-white/5"
                        >
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                              {item.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <Search
                      size={22}
                      className="mx-auto text-slate-600"
                    />

                    <p className="mt-2 text-sm text-slate-400">
                      No matching models or pages
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try "spam", "movie", "book", or "fashion"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              className="relative grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              type="button"
              aria-label="Notifications"
              onClick={handleNotificationClick}
            >
              <Bell size={18} />

              {notifications.length > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-surface-900 shadow-2xl">

                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Notifications
                    </p>

                    <p className="text-xs text-slate-500">
                      Recent ML activity
                    </p>
                  </div>

                  {notifications.length > 0 && (
                    <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-300">
                      {notifications.length}
                    </span>
                  )}
                </div>

                {notifications.length > 0 ? (
                  <>
                    <div className="max-h-80 overflow-y-auto p-2">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={openHistory}
                          className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-white/5"
                        >
                          <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">
                            <Bell size={14} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">
                              {notification.model_name}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {notification.input_data}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-600">
                              {formatDate(
                                notification.created_at
                              )}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-white/10 p-2">
                      <button
                        type="button"
                        onClick={openHistory}
                        className="w-full rounded-lg px-3 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
                      >
                        View all prediction history
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell
                      size={24}
                      className="mx-auto text-slate-600"
                    />

                    <p className="mt-2 text-sm text-slate-400">
                      No recent notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Your recent ML activity will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="hidden text-right transition hover:opacity-80 sm:block"
          >
            <p className="text-sm font-medium text-white">
              {user?.username || "ML Hub User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email || "Authenticated"}
            </p>
          </button>

          {/* Logout */}
          <button
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}