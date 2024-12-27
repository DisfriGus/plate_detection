"use client";
import { useState } from "react";
import { TbUpload } from "react-icons/tb";
export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null); // State untuk gambar yang diunggah

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0]; // Tambahkan null checking
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Buat URL sementara untuk gambar
      setUploadedImage(imageUrl); // Simpan URL ke state
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 p-4 flex justify-center items-center">
        <h1 className="text-white font-bold text-lg text-center">
          License Plate Detection
        </h1>
        {/* <nav>
          <a href="#contact" className="text-white mr-4">
            Contact
          </a>
          <button className="bg-white text-blue-500 px-4 py-2 rounded">
            Sign Up
          </button>
        </nav> */}
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6">
          {/* Image Section */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow">
              <div className="relative w-full h-64 border rounded-md overflow-hidden">
                {uploadedImage ? (
                  <img
                    src={uploadedImage} // Tampilkan gambar yang diunggah
                    alt="Uploaded License Plate"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    No Image Uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-shrink-0">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">License Plate</p>
                  <p className="font-bold text-lg">
                    {uploadedImage ? "B591RI" : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Region</p>
                  <p className="font-bold text-lg">
                    {uploadedImage ? "ID" : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mt-8 text-center">
            <label
              htmlFor="file-upload"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center justify-between mx-auto cursor-pointer"
            >
              <span className="material-icons mr-2">Upload Image</span>
              <span>
                <TbUpload />
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <select className="mt-4 border p-2 rounded w-32 mx-auto">
              <option>Global</option>
            </select>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
