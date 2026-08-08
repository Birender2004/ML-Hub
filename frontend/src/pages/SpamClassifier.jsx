import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, MessageSquareText, ShieldAlert } from "lucide-react";
import Button from "../components/UI/Button.jsx";
import Card from "../components/UI/Card.jsx";
import PageHeader from "../components/UI/PageHeader.jsx";
import { classifySpam } from "../services/spamService.js";

export default function SpamClassifier() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resultTone = useMemo(() => {
    if (!result) return null;
    return result.toLowerCase() === "spam"
      ? {
          label: "Spam detected",
          icon: ShieldAlert,
          className: "border-rose-400/25 bg-rose-400/10 text-rose-100",
        }
      : {
          label: "Message looks safe",
          icon: CheckCircle2,
          className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
        };
  }, [result]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const response = await classifySpam({ message });
      setResult(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.detail || "Could not classify this message.");
    } finally {
      setIsLoading(false);
    }
  }

  const ResultIcon = resultTone?.icon;

  return (
    <>
      <PageHeader title="Spam Classifier" description="Classify messages with an ML-powered spam detection workflow." />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <MessageSquareText size={17} />
                SMS message
              </span>
              <textarea
                className="min-h-52 w-full resize-y rounded-lg border border-white/10 bg-surface-900 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Paste or type an SMS message here..."
                required
                value={message}
              />
            </label>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500">{message.length} characters</p>
              <Button disabled={isLoading || !message.trim()} type="submit">
                {isLoading ? "Classifying..." : "Classify message"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="min-h-72">
          <p className="text-sm font-medium text-slate-300">Prediction result</p>
          <div className="mt-5">
            {resultTone && (
              <div className={`rounded-lg border p-4 ${resultTone.className}`}>
                <div className="flex items-center gap-3">
                  <ResultIcon size={22} />
                  <div>
                    <p className="font-semibold">{resultTone.label}</p>
                    <p className="mt-1 text-sm opacity-80">Model output: {result}</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-rose-400/25 bg-rose-400/10 p-4 text-rose-100">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 shrink-0" size={20} />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            {!resultTone && !error && (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                Your spam prediction will appear here after you submit a message.
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
