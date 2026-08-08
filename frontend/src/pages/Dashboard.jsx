import { useEffect, useState } from "react";
import {
  Activity,
  BookOpen,
  Clapperboard,
  MailWarning,
  Shirt,
} from "lucide-react";

import Card from "../components/UI/Card.jsx";
import PageHeader from "../components/UI/PageHeader.jsx";
import api from "../services/api.js";

const modelCards = [
  {
    key: "spam",
    label: "Spam Predictions",
    icon: MailWarning,
  },
  {
    key: "movies",
    label: "Movie Recommendations",
    icon: Clapperboard,
  },
  {
    key: "books",
    label: "Book Recommendations",
    icon: BookOpen,
  },
  {
    key: "fashion",
    label: "Fashion Recommendations",
    icon: Shirt,
  },
];

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState("Checking API...");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [healthResponse, dashboardResponse] = await Promise.all([
          api.get("/"),
          api.get("/dashboard/stats"),
        ]);

        setApiStatus(
          healthResponse.data?.message || "Backend connected"
        );

        setDashboard(dashboardResponse.data);
      } catch (err) {
        console.error(err);

        setApiStatus("Backend unavailable");
        setError(
          err.response?.data?.detail ||
            "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalPredictions = dashboard?.total_predictions ?? 0;

  const modelCounts = dashboard?.model_counts ?? {
    spam: 0,
    movies: 0,
    books: 0,
    fashion: 0,
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of model tools, recent activity, and product health."
      />

      {/* API Status */}
      <Card className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            API connection
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {apiStatus}
          </p>
        </div>

        <span
          className={`h-3 w-3 rounded-full ${
            apiStatus === "Backend unavailable"
              ? "bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.7)]"
              : "bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.7)]"
          }`}
        />
      </Card>

      {/* Error */}
      {error && (
        <Card className="mb-4 border border-red-400/20 bg-red-400/5">
          <p className="text-sm text-red-300">
            {error}
          </p>
        </Card>
      )}

      {/* Main Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Predictions */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Total Predictions
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">
                {loading ? "--" : totalPredictions}
              </p>
            </div>

            <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <Activity size={20} />
            </div>
          </div>
        </Card>

        {/* Model Statistics */}
        {modelCards.slice(0, 3).map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-3 text-3xl font-semibold text-white">
                    {loading
                      ? "--"
                      : modelCounts[item.key] ?? 0}
                  </p>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Fashion + Recent Activity */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Fashion Recommendations
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">
                {loading ? "--" : modelCounts.fashion ?? 0}
              </p>
            </div>

            <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <Shirt size={20} />
            </div>
          </div>
        </Card>

        {/* Recent Predictions */}
        <Card className="xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Predictions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your latest ML activity.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">
              Loading recent activity...
            </p>
          ) : dashboard?.recent_predictions?.length > 0 ? (
            <div className="space-y-3">
              {dashboard.recent_predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {prediction.model_name}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {prediction.input_data}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-slate-500">
                    {prediction.created_at
                      ? new Date(
                          prediction.created_at
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No predictions yet.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}