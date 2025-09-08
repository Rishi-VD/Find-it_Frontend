import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Mail } from "lucide-react";

const ViewAllLostItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("https://find-it-backend-theta.vercel.app/api/posts/all");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-100"></div>

            <div className="absolute top-20 left-16 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-24 right-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-10 right-200 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    View All Lost Items
                </h1>
                <p className="text-muted-foreground text-center mb-15 w-full mx-auto">
                    Browse through all reported lost belongings. Easily find details,
                    connect with owners, and help reunite items with their rightful people.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) =>
                        item.status === "Lost" && (
                            <Card
                                key={item._id}
                                className="overflow-hidden p-0 m-0 bg-white cursor-pointer border-none shadow-[6px_6px_20px_rgba(0,0,0,0.2)]
                                !rounded-sm duration-300 hover:shadow-soft hover:-translate-y-1 transition-all 
                                backdrop-blur hover:shadow-[10px_10px_25px_rgba(37,99,235,0.6)]"
                            >
                                <div className="relative h-48 w-full">
                                    <img
                                        src={item.file}
                                        alt={item.title}
                                        className="w-full object-cover h-50"
                                    />
                                    <Badge
                                        className={`absolute top-3 left-3 text-xs ${item.status === "found"
                                            ? "bg-blue-400 text-white rounded-2xl"
                                            : "bg-amber-400 text-black rounded-2xl"
                                            }`}
                                    >
                                        {item.type === "found" ? "Found" : "Lost"}
                                    </Badge>
                                </div>

                                <CardContent className="px-4 pb-2 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">
                                            {item.title}
                                        </CardTitle>
                                        <Badge
                                            variant="outline"
                                            className="ml-2 rounded-2xl border-gray-300"
                                        >
                                            {item.category}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="space-y-1 text-sm">
                                        <div className="flex text-gray-500 items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{item.phone}</span>
                                        </div>
                                        <div className="flex text-gray-500 items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            asChild
                                            className="w-full flex mb-2 items-center gap-2 text-white bg-gradient-to-r from-sky-600 to-sky-500 border-none hover:from-sky-700 hover:to-sky-600 rounded shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
                                        >
                                            <a
                                                href={`mailto:${item.email}?subject=Regarding your ${item.title} post`}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Contact via Email
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAllLostItems;
