import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import Card from "../components/UI/Card.jsx";
import PageHeader from "../components/UI/PageHeader.jsx";
import { recommendBook } from "../services/bookService.js";

export default function BookRecommendation() {
  const [book, setBook] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRecommend(e) {
    e.preventDefault();

    if (!book.trim()) {
      setError("Please enter a book name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await recommendBook(book);

      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err);
      setRecommendations([]);
      setError("Unable to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Book Recommendation"
        description="Discover similar books using collaborative filtering."
      />

      <Card className="space-y-8">

        <form
          onSubmit={handleRecommend}
          className="flex flex-col gap-4 md:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Enter a book title..."
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface-950 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-surface-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Recommend"
            )}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((book, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-white/10 bg-surface-900 transition hover:border-cyan-400"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-80 w-full object-cover"
                />

                <div className="space-y-2 p-5">
                  <h2 className="line-clamp-2 text-lg font-semibold text-white">
                    {book.title}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </Card>
    </>
  );
}