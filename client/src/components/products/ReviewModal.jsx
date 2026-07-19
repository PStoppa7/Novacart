import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

export default function ReviewModal({
  open,
  onClose,
  onSubmit,
}) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      rating,
      title,
      comment,
    });

    setRating(5);
    setTitle("");
    setComment("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-black"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="mb-8 text-3xl font-bold">
          Write a Review
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Rating */}

          <div>

            <label className="mb-3 block font-semibold">
              Rating
            </label>

            <div className="flex gap-2">

              {[1,2,3,4,5].map((star)=>(

                <button
                  key={star}
                  type="button"
                  onMouseEnter={()=>setHover(star)}
                  onMouseLeave={()=>setHover(0)}
                  onClick={()=>setRating(star)}
                >

                  <FaStar
                    size={32}
                    className={
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />

                </button>

              ))}

            </div>

          </div>

          {/* Title */}

          <div>

            <label className="mb-2 block font-semibold">
              Review Title
            </label>

            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full rounded-xl border p-4"
              placeholder="Amazing product..."
            />

          </div>

          {/* Comment */}

          <div>

            <label className="mb-2 block font-semibold">
              Your Review
            </label>

            <textarea
              rows={5}
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className="w-full rounded-xl border p-4"
              placeholder="Tell other customers about your experience..."
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-gray-200 px-6 py-3"
            >
              Cancel
            </button>

            <button
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Submit Review
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}