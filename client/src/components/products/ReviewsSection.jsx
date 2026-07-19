import { FaStar, FaRegStar } from "react-icons/fa";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import ReviewModal from "./ReviewModal";

export default function ReviewsSection({
  reviews = [],
  onSubmit,
}) {
  const [openModal, setOpenModal] = useState(false);

  async function handleSubmit(review) {
    try {
      await onSubmit(review);

      setOpenModal(false);

    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to submit review."
      );
    }
  }

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (
      total / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    const total = reviews.length || 1;

    return [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter(
        (review) =>
          Number(review.rating) === stars
      ).length;

      return {
        stars,
        percent: Math.round(
          (count / total) * 100
        ),
      };
    });
  }, [reviews]);

  return (
    <>
      <section className="mt-24">

        <h2 className="mb-10 text-4xl font-bold">
          Customer Reviews
        </h2>

        <div className="grid gap-10 lg:grid-cols-[350px_1fr]">

          {/* Rating Summary */}

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <div className="text-center">

              <h1 className="text-6xl font-bold">
                {averageRating}
              </h1>

              <div className="mt-3 flex justify-center gap-1">

                {[...Array(5)].map((_, i) => (

                  i < Math.round(averageRating) ? (

                    <FaStar
                      key={i}
                      className="text-yellow-400"
                    />

                  ) : (

                    <FaRegStar
                      key={i}
                      className="text-gray-300"
                    />

                  )

                ))}

              </div>

              <p className="mt-3 text-gray-500">
                Based on {reviews.length} review
                {reviews.length !== 1 && "s"}
              </p>

            </div>

            <div className="mt-10 space-y-4">

              {ratingBreakdown.map((item) => (

                <div
                  key={item.stars}
                  className="flex items-center gap-3"
                >

                  <span className="w-4">
                    {item.stars}
                  </span>

                  <FaStar className="text-yellow-400" />

                  <div className="h-3 flex-1 rounded-full bg-gray-200">

                    <div
                      className="h-3 rounded-full bg-yellow-400"
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />

                  </div>

                  <span className="w-10 text-sm">
                    {item.percent}%
                  </span>

                </div>

              ))}

            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="
                mt-8
                w-full
                rounded-2xl
                bg-blue-600
                py-4
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Write a Review
            </button>

          </div>

          {/* Reviews */}

          <div className="space-y-8">

            {reviews.length === 0 ? (

              <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

                <h3 className="text-2xl font-bold">
                  No reviews yet
                </h3>

                <p className="mt-4 text-gray-500">
                  Be the first customer to review this product.
                </p>

              </div>

            ) : (

              reviews.map((review) => (

                <div
                  key={review.id}
                  className="rounded-3xl bg-white p-8 shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-xl font-bold">
                        {review.name || "Anonymous"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          review.created_at
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    {review.verified_purchase && (

                      <span
                        className="
                          rounded-full
                          bg-green-100
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-green-700
                        "
                      >
                        Verified Purchase
                      </span>

                    )}

                  </div>

                  <div className="mt-5 flex gap-1">

                    {[...Array(5)].map((_, i) =>

                      i < Number(review.rating) ? (

                        <FaStar
                          key={i}
                          className="text-yellow-400"
                        />

                      ) : (

                        <FaRegStar
                          key={i}
                          className="text-gray-300"
                        />

                      )

                    )}

                  </div>

                  {review.title && (

                    <h4 className="mt-5 text-lg font-semibold">
                      {review.title}
                    </h4>

                  )}

                  <p className="mt-3 leading-8 text-gray-600">
                    {review.comment}
                  </p>

                  <div className="mt-6 flex gap-4">

                    <button
                      className="
                        rounded-full
                        bg-gray-100
                        px-5
                        py-2
                        transition
                        hover:bg-gray-200
                      "
                    >
                      👍 Helpful
                    </button>

                    <button
                      className="
                        rounded-full
                        bg-gray-100
                        px-5
                        py-2
                        transition
                        hover:bg-gray-200
                      "
                    >
                      Reply
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </section>

      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

    </>
  );
}