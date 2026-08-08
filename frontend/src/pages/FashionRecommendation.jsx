import { useState } from "react";
import { Upload, Sparkles, Loader2 } from "lucide-react";

import Card from "../components/UI/Card.jsx";
import PageHeader from "../components/UI/PageHeader.jsx";
import { recommendFashion } from "../services/fashionService.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function FashionRecommendation() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setRecommendations([]);
    setError("");
  }

  async function handleRecommend() {
    if (!selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await recommendFashion(selectedImage);

      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to generate fashion recommendations."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <PageHeader
        title="Fashion Recommendation"
        description="Upload a fashion image and discover visually similar items."
      />

      <div className="space-y-6">
        {/* Upload Section */}
        <Card className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Preview */}
            <div className="flex flex-1 items-center justify-center">
              {preview ? (
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                  <img
                    src={preview}
                    alt="Selected fashion item"
                    className="max-h-80 max-w-full object-contain"
                  />
                </div>
              ) : (
                <label className="flex min-h-72 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.02] transition hover:border-cyan-400/40 hover:bg-white/[0.04]">
                  <Upload
                    size={36}
                    className="mb-3 text-cyan-300"
                  />

                  <p className="text-sm font-medium text-white">
                    Upload a fashion image
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    JPG, JPEG or PNG
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-1 flex-col justify-center">
              <h2 className="text-lg font-semibold text-white">
                Find Similar Fashion
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Our ResNet50-based image recommendation system analyzes the
                visual features of your image and finds the closest fashion
                items from the dataset.
              </p>

              <label className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10">
                <Upload size={17} />
                Choose Image

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <button
                type="button"
                onClick={handleRecommend}
                disabled={!selectedImage || loading}
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-surface-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Finding Similar Items...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Recommend
                  </>
                )}
              </button>

              {error && (
                <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Card className="p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-white">
                Recommended Fashion
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Visually similar items found by the ML model.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {recommendations.map((item, index) => (
                <div
                  key={`${item.filename}-${index}`}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-cyan-300/30"
                >
                  <div className="aspect-[3/4] bg-black">
                    <img
                      src={`${API_BASE_URL}${item.image_url}`}
                      alt={`Fashion recommendation ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="truncate text-xs text-slate-400">
                      Recommendation {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}