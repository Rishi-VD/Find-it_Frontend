import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShieldCheck, Mail, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

const SearchLostItems = () => {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            if (items.length > 0) return;
            setLoading(true);
            try {
                const res = await fetch(`https://find-it-backend-theta.vercel.app/api/posts/all`, {
                    cache: "force-cache",
                });
                if (!res.ok) throw new Error("Failed to fetch items");

                const data = await res.json();
                setItems(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [items]);

    const displayedItems = useMemo(() => {
        if (!query.trim()) return items;

        const matched = items.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        const unmatched = items.filter(
            (item) => !item.title.toLowerCase().includes(query.toLowerCase())
        );

        return [...matched, ...unmatched];
    }, [items, query]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative">
            <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

            <div className="relative max-w-7xl mx-auto p-6">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center w-full max-w-2xl bg-white/70 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
                        <Search className="w-5 h-5 text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Search lost items by title..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>


                {loading && <p className="text-center text-gray-500">Loading items...</p>}

                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            item.status === "Lost" && <Card
                                key={item._id}
                                className={`overflow-hidden p-0 m-0 cursor-pointer border-none shadow-[6px_6px_20px_rgba(0,0,0,0.2)]
  !rounded-sm duration-300 hover:shadow-soft hover:-translate-y-1 transition-all 
  backdrop-blur mx-auto max-w-sm flex flex-col
  ${index === 0 && query ? "bg-yellow-50 border border-yellow-400" : "bg-white"}`}
                            >
                                <div className="relative w-full">
                                    <img
                                        src={item.file}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
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

                                <CardContent className="w-full px-4 py-3">
                                    <div className="flex flex-col gap-3 text-sm">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-base font-semibold leading-snug">
                                                {item.title}
                                            </CardTitle>
                                            <Badge
                                                variant="outline"
                                                className="ml-2 rounded-2xl border-gray-300 text-xs"
                                            >
                                                {item.category}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
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
                                        <Link to="/report-found-item" state={{ item }} className="block">
                                            <Button
                                                className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white flex items-center gap-2 rounded shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                                Post Item as Found
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        !loading && <p className="text-center text-gray-500">No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchLostItems;
