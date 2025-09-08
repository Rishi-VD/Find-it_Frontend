import { useLocation } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ReportFoundItem() {
  const location = useLocation();
  const { item } = location.state || {};

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://find-it-backend-theta.vercel.app/api/items/${item._id}/found`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update item");
      const updated = await res.json();

      toast.success("Item marked as Found😊");

      window.location.href = "/success-stories";
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  if (!item) {
    return <p className="text-center text-gray-500 mt-10">No item data available.</p>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>

      {/* Floating blurred blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative w-[60%] mx-auto my-10 bg-transparent p-6 shadow-sm rounded-2xl">
        {/* keep your existing content here */}
        <h1 className="text-3xl font-bold sm:flex flex-col text-gray-800 mb-6 text-center">
          Report Found Items
        </h1>
        <p className="text-muted-foreground text-center mb-12 w-full mx-auto">
          Share details of items you’ve found. Help owners reconnect with their belongings by reporting found items here.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="overflow-hidden p-0 m-0 bg-white border-none shadow-md rounded self-start">
            <div className="relative sm:h-full md:h-auto lg:h-auto w-full">
              <img
                src={item.file}
                alt={item.title}
                className="w-full sm:h-full md:h-50 lg:h-50 object-cover"
              />
              <Badge
                className={`absolute top-3 left-3 text-xs ${item.status === "Found"
                  ? "bg-blue-400 text-white"
                  : "bg-amber-400 text-black"
                  } rounded-2xl`}
              >
                {item.status === "Found" ? "Found" : "Lost"}
              </Badge>
            </div>

            <CardContent className="w-full px-4 py-3 space-y-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base font-semibold leading-snug">
                  <span className="text-blue-500">{item.name}</span>: {item.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="ml-2 rounded-2xl border-gray-300 text-xs"
                >
                  {item.category}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

              <div className="space-y-1 text-sm">
                <div className="flex text-gray-500 items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{item.phone}</span>
                </div>
                <div className="flex text-gray-500 items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{item.email}</span>
                </div>
                <div className="flex text-gray-500 items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>


          <Card className="overflow-hidden bg-white rounded p-6 border-none shadow-[6px_6px_20px_rgba(0,0,0,0.2)]">
            <h2 className="text-xl font-semibold mb-4">Mark Item as Found</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <option value="Found">Found</option>
              </select>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded shadow-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-[1.03]"
              >
                Submit
              </button>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
}



