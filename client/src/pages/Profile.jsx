import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    avatar: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // Load Profile
  // ==========================
  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        city: res.data.city || "",
        province: res.data.province || "",
        postal_code: res.data.postal_code || "",
        avatar: res.data.avatar || "",
      });

      if (res.data.avatar) {
        setPreview(
          `http://localhost:5000${res.data.avatar}`
        );
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Form Change
  // ==========================
  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  // ==========================
  // Image Selection
  // ==========================
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));
  }

  // ==========================
  // Upload Avatar
  // ==========================
  async function uploadAvatar() {
    if (!selectedImage) {
      return toast.error("Please choose an image.");
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("avatar", selectedImage);

      await axios.put(
        "http://localhost:5000/api/profile/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },

          onUploadProgress(progressEvent) {
            const percent = Math.round(
              (progressEvent.loaded * 100) /
                progressEvent.total
            );

            setProgress(percent);
          },
        }
      );

      toast.success("Profile picture updated!");

      setSelectedImage(null);

      fetchProfile();

    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  // ==========================
  // Save Profile
  // ==========================
  async function saveProfile() {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/profile",
        {
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          province: profile.province,
          postal_code: profile.postal_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Profile updated successfully!"
      );

    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading Profile...
      </div>
    );
  }
    return (
    <div className="mx-auto max-w-5xl p-8">

      <div className="rounded-2xl bg-white p-8 shadow">

        <div className="mb-10 flex flex-col items-center">

          <img
            src={
              preview
                ? preview
                : "https://placehold.co/180x180?text=Avatar"
            }
            alt="Profile"
            className="h-44 w-44 rounded-full border-4 border-blue-500 object-cover shadow-lg"
          />

          <label className="mt-5 cursor-pointer rounded-lg bg-gray-100 px-6 py-3 font-semibold transition hover:bg-gray-200">
            Choose Profile Picture

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {selectedImage && (
            <button
              onClick={uploadAvatar}
              disabled={uploading}
              className="mt-5 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {uploading
                ? "Uploading..."
                : "Upload Picture"}
            </button>
          )}

          {uploading && (
            <div className="mt-6 w-full max-w-md">

              <div className="mb-2 flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          )}

        </div>

        <h1 className="mb-8 text-center text-3xl font-bold">
          My Profile
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-semibold">
              Name
            </label>

            <input
              value={profile.name}
              disabled
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Phone
            </label>

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Address
            </label>

            <input
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              City
            </label>

            <input
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Province
            </label>

            <input
              name="province"
              value={profile.province}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold">
              Postal Code
            </label>

            <input
              name="postal_code"
              value={profile.postal_code}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

        </div>

        <button
          onClick={saveProfile}
          className="mt-10 w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Profile;