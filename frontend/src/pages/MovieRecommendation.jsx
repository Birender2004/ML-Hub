import { useState } from "react";
import { recommendMovie } from "../services/movieService";

export default function MovieRecommendation() {
  const [movie, setMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!movie.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await recommendMovie(movie);

      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err);
      setError("Movie not found or something went wrong.");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090c14] text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-[#141821] border border-[#24364d] rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-center text-white mb-2">
            🎬 Movie Recommendation
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Find movies similar to your favorite movie.
          </p>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter Movie Name..."
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              className="flex-1 bg-[#0d1220] border border-[#24364d] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />

            <button
              onClick={handleRecommend}
              disabled={loading}
              className="bg-cyan-600 text-white px-8 py-3 rounded-xl hover:bg-cyan-700 transition disabled:bg-gray-700"
            >
              {loading ? "Loading..." : "Recommend"}
            </button>

          </div>

          {error && (
            <div className="mt-6 bg-red-900/20 border border-red-700 text-red-400 p-3 rounded-lg">
              {error}
            </div>
          )}

          {recommendations.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-white mt-10 mb-6">
                Recommended Movies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {recommendations.map((movie, index) => (

                  <div
                    key={index}
                    className="bg-[#141821] border border-[#24364d] rounded-xl overflow-hidden hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
                  >

                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-96 object-cover"
                    />

                    <div className="p-4 bg-[#141821]">

                      <h3 className="text-lg font-semibold text-center text-white">
                        {movie.title}
                      </h3>

                    </div>

                  </div>

                ))}

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}