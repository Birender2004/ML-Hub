import { useEffect, useState } from "react";
import { Clock, History, Loader2 } from "lucide-react";

import { getPredictionHistory } from "../services/historyService";

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await getPredictionHistory();
        setHistory(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load prediction history.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090c14]">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090c14] text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <History className="text-cyan-400" size={34} />
          <h1 className="text-4xl font-bold">
            Prediction History
          </h1>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {!error && history.length === 0 && (
          <div className="bg-[#141821] border border-[#24364d] rounded-xl p-8 text-center text-gray-400">
            No prediction history found.
          </div>
        )}

        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-[#141821] border border-[#24364d] rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-xl font-semibold text-cyan-400">
                    {item.model_name}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={16} />
                  {new Date(item.created_at).toLocaleString()}
                </div>

              </div>

              <div className="mb-5">
                <h3 className="text-gray-400 mb-2">
                  Input
                </h3>

                <div className="bg-[#0d1220] rounded-lg p-4 border border-[#24364d]">
                  {item.input_data}
                </div>
              </div>

              <div>
                <h3 className="text-gray-400 mb-2">
                  Output
                </h3>

                <div className="bg-[#0d1220] rounded-lg p-4 border border-[#24364d] whitespace-pre-wrap">
                  {item.output_data}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}