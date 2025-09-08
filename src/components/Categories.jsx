import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Smartphone,
    Briefcase,
    Heart,
    Key,
    PawPrint,
    FileText,
    Headphones,
    Watch
} from "lucide-react";

const Categories = () => {
    const [categories, setCategories] = useState([
        { name: "Electronics", icon: Smartphone, count: 0, color: "text-blue-600" },
        { name: "Bags & Wallets", icon: Briefcase, count: 0, color: "text-purple-600" },
        { name: "Jewelry", icon: Heart, count: 0, color: "text-pink-600" },
        { name: "Keys", icon: Key, count: 0, color: "text-yellow-600" },
        { name: "Pets", icon: PawPrint, count: 0, color: "text-green-600" },
        { name: "Documents", icon: FileText, count: 0, color: "text-gray-600" },
        { name: "Accessories", icon: Headphones, count: 0, color: "text-indigo-600" },
        { name: "Watches", icon: Watch, count: 0, color: "text-orange-600" }
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("https://find-it-backend-theta.vercel.app/api/posts/all");
                const data = await res.json();

                const updatedCategories = categories.map(cat => ({
                    ...cat,
                    count: data.filter(item => item.category === cat.name).length || 0
                }));

                setCategories(updatedCategories);
            } catch (err) {
                console.error("Error fetching items:", err);
            }
        };

        fetchItems();

        const interval = setInterval(fetchItems, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="pt-20 flex justify-center w-full bg-muted/30 bg-gray-50">
            <div className="container w-8/12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find items by category to narrow down your search and discover what's been recently found.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            className="cursor-pointer border-none shadow-[6px_6px_20px_rgba(0,0,0,0.2)] hover:shadow-soft duration-300 hover:-translate-y-1 transition-all bg-white backdrop-blur rounded-md hover:shadow-[10px_10px_25px_rgba(37,99,235,0.6)]"
                        >
                            <CardContent className="p-6 bg-white text-center">
                                <div className={`inline-flex items-center justify-center p-2 bg-gray-100 w-12 h-12 rounded bg-background mb-4 ${category.color}`}>
                                    <category.icon className="h-10 w-10" />
                                </div>
                                <h3 className="font-semibold mb-1">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {category.count} items
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
