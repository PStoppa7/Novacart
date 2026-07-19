export default function getImageUrl(image) {
  if (!image) {
    return "https://placehold.co/400x400?text=No+Image";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `http://localhost:5000${image}`;
}