"use client";
import { useState } from "react";
import axios from "axios";
import { TbUpload } from "react-icons/tb";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Gambar yang diunggah
  const [resultImage, setResultImage] = useState<string | null>(null); // Gambar hasil deteksi
  const [predictions, setPredictions] = useState([]); // Hasil prediksi
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState<string | null>(null); // Pesan error

  // Base URL untuk API Flask
  const BASE_URL = "http://127.0.0.1:5000";

  // Fungsi untuk mengunggah gambar
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Please select a valid image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl); // Simpan URL sementara untuk pratinjau gambar
    setLoading(true); // Aktifkan status loading
    setError(null); // Reset pesan error
    setResultImage(null); // Reset hasil sebelumnya
    setPredictions([]); // Reset prediksi sebelumnya

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Kirim gambar ke backend Flask
      const response = await axios.post(`${BASE_URL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      if (data.error) {
        setError(data.error); // Tampilkan pesan error jika ada
      } else {
        setResultImage(data.image_url); // Simpan URL gambar hasil
        setPredictions(data.predictions); // Simpan hasil prediksi
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false); // Nonaktifkan status loading
    }
  };

  console.log("Result image URL:", resultImage);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 p-4 flex justify-center items-center">
        <h1 className="text-white font-bold text-lg text-center">
          License Plate Detection
        </h1>
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6">
          {/* Upload Section */}
          <div className="text-center">
            <label
              htmlFor="file-upload"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-300 transition"
            >
              <span className="material-icons mr-2">Upload Image</span>
              <TbUpload />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <p className="text-blue-500 mt-4 animate-pulse">
              Processing image...
            </p>
          )}

          {/* Uploaded Image */}
          {uploadedImage && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Uploaded Image</h2>
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="object-cover w-full h-64 rounded-md shadow"
              />
            </div>
          )}

          {/* Result Image */}
          {resultImage && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Detection Result</h2>
              <img
                src={resultImage}
                alt="Result"
                className="object-cover w-full h-64 rounded-md shadow"
              />
            </div>
          )}

          {/* Predictions */}
          {predictions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">Predictions</h2>
              <ul className="list-disc pl-5">
                {predictions.map((prediction: any, index: number) => (
                  <li key={index} className="text-gray-700">
                    {prediction.name} - Confidence:{" "}
                    {prediction.confidence.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
