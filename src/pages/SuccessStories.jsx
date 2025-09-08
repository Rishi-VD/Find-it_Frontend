import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Clock } from "lucide-react";

const SuccessStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://find-it-backend-theta.vercel.app/api/items/success-stories");
                if (!res.ok) throw new Error("Failed to load success stories");
                const data = await res.json();
                setStories(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) return <p className="text-center text-gray-500 mt-8">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
    if (!stories.length) return <p className="text-center text-gray-500 mt-8">No success stories yet.</p>;

    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50"></div>

            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">Success Stories</h1>
                <p className="text-muted-foreground text-center mb-8">
                    Lost items that were reunited — reporter & finder shown side-by-side.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stories.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 space-y-4"
                        >

                            <div className="flex flex-col sm:flex-row gap-4">

                                <Card className="flex-1 overflow-hidden p-0 m-0 bg-amber-50 border border-amber-300 shadow-md">
                                    <div className="relative w-full">
                                        <img
                                            src={item.file ? `${item.file}` : "/placeholder.png"}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <Badge className="absolute top-3 left-3 text-xs bg-amber-400 text-black rounded-2xl">
                                            Lost
                                        </Badge>
                                    </div>

                                    <CardContent className="px-4 py-3 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-base font-semibold leading-snug">
                                                <span className="text-amber-600">
                                                    {item.reportedBy?.name || "Reported"}
                                                </span>{" "}
                                                : {item.title}
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
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Phone className="h-4 w-4" />
                                                {item.reportedBy?.phone ? (
                                                    <a href={`tel:${item.reportedBy.phone}`} className="underline">
                                                        {item.reportedBy.phone}
                                                    </a>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Mail className="h-4 w-4" />
                                                {item.reportedBy?.email ? (
                                                    <a href={`mailto:${item.reportedBy.email}`} className="underline">
                                                        {item.reportedBy.email}
                                                    </a>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-xs">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1 overflow-hidden p-0 m-0 bg-blue-50 border border-blue-300 shadow-md">
                                    <div className="relative w-full">
                                        <img
                                            src={item.file ? `${item.file}` : "/placeholder.png"}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <Badge className="absolute top-3 left-3 text-xs bg-blue-400 text-white rounded-2xl">
                                            Found
                                        </Badge>
                                    </div>

                                    <CardContent className="px-4 py-3 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-base font-semibold leading-snug">
                                                <span className="text-blue-600">
                                                    {item.foundBy?.name || "Finder"}
                                                </span>{" "}
                                                : {item.foundBy.title}
                                            </CardTitle>
                                            <Badge
                                                variant="outline"
                                                className="ml-2 rounded-2xl border-gray-300 text-xs"
                                            >
                                                {item.category}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {item.foundBy.description}
                                        </p>

                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Phone className="h-4 w-4" />
                                                {item.foundBy?.phone ? (
                                                    <a href={`tel:${item.foundBy.phone}`} className="underline">
                                                        {item.foundBy.phone}
                                                    </a>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Mail className="h-4 w-4" />
                                                {item.foundBy?.email ? (
                                                    <a href={`mailto:${item.foundBy.email}`} className="underline">
                                                        {item.foundBy.email}
                                                    </a>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-xs">
                                                    {new Date(item.updatedAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                                <span>Reported by {item.reportedBy?.name || "N/A"}</span>
                                <span>Found by {item.foundBy?.name || "N/A"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;



