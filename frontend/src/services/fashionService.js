import api from "./api";

export function recommendFashion(imageFile) {
  const formData = new FormData();

  formData.append("image", imageFile);

  return api.post("/fashion/recommend", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}