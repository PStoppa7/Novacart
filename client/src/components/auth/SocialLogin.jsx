import {
  FcGoogle,
} from "react-icons/fc";

import {
  FaApple,
  FaFacebook,
} from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="space-y-3">

      <button
        type="button"
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-white
          py-3
          font-semibold
          text-gray-700
          transition
          hover:scale-[1.02]
        "
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <button
        type="button"
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-black
          py-3
          font-semibold
          text-white
          transition
          hover:scale-[1.02]
        "
      >
        <FaApple size={22} />
        Continue with Apple
      </button>

      <button
        type="button"
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-blue-700
          py-3
          font-semibold
          text-white
          transition
          hover:scale-[1.02]
        "
      >
        <FaFacebook size={22} />
        Continue with Facebook
      </button>

    </div>
  );
}