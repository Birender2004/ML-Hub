import api from "./api";

export function classifySpam(payload) {
  return api.post("/spam/predict", payload);
}
