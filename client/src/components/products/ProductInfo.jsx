import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function ProductInfo({
  product,
}) {
  return (
    <div className="space-y-8">

      <div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          In Stock
        </span>

      </div>

      <h1 className="text-5xl font-bold">
        {product.name}
      </h1>

      <div className="flex items-center gap-2">

        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className="text-yellow-400"
          />
        ))}

        <span className="ml-2 text-gray-500">
          (128 Reviews)
        </span>

      </div>

      <div>

        <p className="text-5xl font-bold text-blue-600">
          R{product.price}
        </p>

      </div>

      <p className="text-lg leading-8 text-gray-600">
        {product.description}
      </p>

    </div>
  );
}
