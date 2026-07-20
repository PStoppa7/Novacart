const API_URL = "https://novacart-api-ferw.onrender.com";

export default function getImageUrl(image) {
  if (!image) {
    return "https://placehold.co/400x400?text=No+Image";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${API_URL}${image}`;
}