import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "../components/Layout/ProtectedLayout.jsx";
import BookRecommendation from "../pages/BookRecommendation.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import FashionRecommendation from "../pages/FashionRecommendation.jsx";
import Login from "../pages/Login.jsx";
import MovieRecommendation from "../pages/MovieRecommendation.jsx";
import PredictionHistory from "../pages/PredictionHistory.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import SpamClassifier from "../pages/SpamClassifier.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spam-classifier" element={<SpamClassifier />} />
        <Route path="/movie-recommendation" element={<MovieRecommendation />} />
        <Route path="/book-recommendation" element={<BookRecommendation />} />
        <Route path="/fashion-recommendation" element={<FashionRecommendation />} />
        <Route path="/prediction-history" element={<PredictionHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
