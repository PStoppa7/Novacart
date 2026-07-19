import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000";

export default function ProductGallery({ images = [] }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const validImages = images.filter(
      (img) => img && img.trim() !== ""
    );

    if (validImages.length > 0) {
      setSelected(validImages[0]);
    } else {
      setSelected(null);
    }
  }, [images]);

  function imageUrl(image) {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  }

  return (
    <div className="space-y-6">

      {/* Main Image */}

      <motion.div
        key={selected || "placeholder"}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl bg-white shadow-xl"
      >

        {selected ? (
          <img
            src={imageUrl(selected)}
            alt="Product"
            className="
              h-[550px]
              w-full
              object-contain
              transition-transform
              duration-500
              hover:scale-110
            "
          />
        ) : (
          <div className="flex h-[550px] items-center justify-center text-gray-400">
            No image available
          </div>
        )}

      </motion.div>

      {/* Thumbnails */}

      <div className="flex gap-4 overflow-x-auto">

        {images
          .filter((image) => image && image.trim() !== "")
          .map((image, index) => (

            <button
              key={index}
              onClick={() => setSelected(image)}
              className={`
                h-24
                w-24
                overflow-hidden
                rounded-2xl
                border-2
                transition

                ${
                  selected === image
                    ? "border-blue-600"
                    : "border-transparent"
                }
              `}
            >

              <img
                src={imageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />

            </button>

          ))}

      </div>

    </div>
  );
}