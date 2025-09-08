import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Plus, Laugh } from "lucide-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-none bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-bold font-sans bg-gradient-to-r bg-sky-500 bg-clip-text text-transparent tracking-tight">
                        FindIt
                    </h1>
                    <p className="hidden md:block text-sm/7 text-muted-foreground font-light text-gray-600">
                        Reuniting people with their belongings
                    </p>
                </div>

                <nav className="flex items-center space-x-3">
                    <Link to="/search-lost-items">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                        >
                            <Search className="h-4 w-4" />
                            Browse Items
                        </Button>
                    </Link>
                    <Link to="/post-item">
                        <Button
                            size="sm"
                            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300"
                        >
                            <Plus className="h-4 text-white font-bold w-4" />
                            Post Item
                        </Button>
                    </Link>
                    <Link to="/success-stories">
                        <Button
                            size="sm"
                            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300"
                        >
                            <Laugh className="h-4 text-white font-bold w-4" />
                            Success Stories
                        </Button>
                    </Link>

                </nav>
            </div>
        </header>
    );
};

export default Header;