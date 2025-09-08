import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedItems from "@/components/FeaturedItems";
import Categories from "@/components/Categories";
import Footer from "../components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-background">
            <Header />
            <Hero />
            <Categories />
            <FeaturedItems />
            <Footer />
        </div>
    );
};

export default Index;