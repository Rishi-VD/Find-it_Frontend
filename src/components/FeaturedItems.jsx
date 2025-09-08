import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Phone, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const mockItems = [
    {
        id: 1,
        type: "found",
        title: "iPhone 14 Pro",
        description: "Found at Central Park near the fountain. Black case with small crack on back.",
        call: "9578628467",
        email: "person1@gmail.com",
        timeAgo: "2 hours ago",
        category: "Electronics",
        contact: "Contact via email",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        type: "lost",
        title: "Golden Retriever - Max",
        description: "Friendly golden retriever, responds to Max. Last seen wearing a blue collar.",
        call: "9684759684",
        email: "person2@gmail.com",
        timeAgo: "5 hours ago",
        category: "Pets",
        contact: "Call immediately",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        type: "found",
        title: "Silver Watch",
        description: "Elegant silver watch found on subway line 6. Appears to be vintage.",
        call: "8957864298",
        email: "person3@gmail.com",
        timeAgo: "1 day ago",
        category: "Jewelry",
        contact: "Contact via email",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop"
    }
];

const FeaturedItems = () => {
    return (
        <section className="flex justify-center w-full pt-30 bg-gray-50">
            <div className="container w-8/12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Recent Items</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Check out the latest lost and found items posted by our community members.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockItems.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden p-0 m-0 bg-white border-none rounded-md hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full object-cover h-50"
                                />
                                <Badge
                                    className={`absolute top-3 left-3 ${item.type === "found"
                                        ? "bg-blue-400 text-white rounded-xl"
                                        : "bg-amber-400 text-black rounded-xl"
                                        }`}
                                >
                                    {item.type === "found" ? "Found" : "Lost"}
                                </Badge>
                            </div>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                    <Badge
                                        variant="outline"
                                        className="ml-2 rounded-2xl border-gray-300"
                                    >
                                        {item.category}
                                    </Badge>
                                </div>

                                <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex text-gray-500 items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>{item.call}</span>
                                    </div>
                                    <div className="flex text-gray-500 items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{item.timeAgo}</span>
                                    </div>
                                </div>
                                <a href={`mailto:${item.email}?subject=Regarding your ${item.title} post`}>
                                    <Button
                                        className={`w-full mt-4 ${item.type === "found"
                                            ? "bg-gradient-to-r from-sky-600 to-sky-500 rounded shadow-lg hover:shadow-sm hover:bg-blue-300 text-white"
                                            : "hover:bg-blue-50 transition-all text-sm rounded shadow-sm"
                                            }`}
                                        variant={
                                            item.type === "found"
                                                ? "default"
                                                : "text-gray-900 bg-white/80 hover:bg-blue-50 transition-all text-lg px-8 py-6 rounded shadow-sm"
                                        }
                                    >
                                        {item.contact === "Call immediately" ? <Phone className="h-4 w-4 mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
                                        {item.contact}
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12 mb-30">
                    <Link to="/view-all-lost-items">
                        <Button variant="outline" size="lg" className="text-white bg-gradient-to-r from-sky-600 to-sky-500 border-none hover:bg-accent rounded shadow-lg hover:shadow-xl transition-transform hover:scale-105">
                            View All Items
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedItems;
