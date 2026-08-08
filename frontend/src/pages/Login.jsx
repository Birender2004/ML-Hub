import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button.jsx";
import Card from "../components/UI/Card.jsx";
import Input from "../components/UI/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to sign in. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 text-slate-100">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <p className="text-sm font-semibold text-cyan-300">ML Hub</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Access your AI/ML workspace.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="email"
            onChange={updateField}
            placeholder="Email address"
            required
            type="email"
            value={form.email}
          />
          <Input
            name="password"
            onChange={updateField}
            placeholder="Password"
            required
            type="password"
            value={form.password}
          />
          {error && <p className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Continue"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-400">
          New here? <Link className="text-cyan-300 hover:text-cyan-200" to="/register">Create an account</Link>
        </p>
      </Card>
    </main>
  );
}
