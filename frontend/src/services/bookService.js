import api from "./api";

export function recommendBook(book) {
  return api.post("/book/recommend", {
    book,
  });
}