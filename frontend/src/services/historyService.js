import api from "./api";

export function getPredictionHistory() {
    return api.get("/history/");
}