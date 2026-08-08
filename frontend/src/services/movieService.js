import api from "./api";

export function recommendMovie(movie) {
    return api.post("/movie/recommend", {
        movie,
    });
}