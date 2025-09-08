import React, { useState } from "react";
import Post_Img from "../assets/Post_Item.jpg";
import { toast } from "sonner";

const PostItem = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        description: "",
        category: "",
        status: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageBase64 = await convertToBase64(formData.file);

            const payload = {
                ...formData,
                file: imageBase64,
                path: formData.file?.name || "",
            };

            const res = await fetch("https://find-it-backend-theta.vercel.app/api/posts/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Post added successfully 🎉");

                setTimeout(() => {
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        title: "",
                        description: "",
                        category: "",
                        status: "",
                        file: null,
                    });
                }, 2000);
            } else if (res.status === 400 && data.message?.includes("already exists")) {
                toast.error("This item already exists!");
            } else {
                toast.error("Something went wrong, try again.");
                console.error("Error -->", data);
            }
        } catch (err) {
            toast.error("Upload failed!");
            console.error("Upload error:", err);
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
            <div className="w-[60%] h-[70%] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-lg bg-white/70 border border-white/40">
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white/60 backdrop-blur-xl">
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
                        Post Lost Item
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Item Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        />
                        <textarea
                            name="description"
                            placeholder="Item Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        />
                        <select
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            list="categoryOptions"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Bags & Wallets">Bags & Wallets</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Keys">Keys</option>
                            <option value="Pets">Pets</option>
                            <option value="Documents">Documents</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Watches">Watches</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Others">Others</option>
                        </select>
                        <select
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={formData.status}
                            onChange={handleChange}
                            list="statusOptions"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/80"
                        >
                            <option value="">Select Status</option>
                            <option value="Lost">Lost</option>
                        </select>

                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 bg-white/80"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded shadow-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-[1.03]"
                        >
                            Submit Post
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-1/2 relative overflow-hidden">
                    <img
                        src={Post_Img}
                        alt="AI Lost Item"
                        className="w-full h-full object-cover animate-[smoothPan_18s_infinite]"
                    />
                </div>
            </div>

            <style>{`@keyframes smoothPan {
            0% { transform: scale(1.05) translateX(0); }
            25% { transform: scale(1.08) translateX(-8px); }
            50% { transform: scale(1.05) translateX(0); }
            75% { transform: scale(1.08) translateX(8px); }
            100% { transform: scale(1.05) translateX(0); }
            }`}</style>
        </div>
    );
};

export default PostItem;
