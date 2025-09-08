import { Button } from "@/components/ui/button";
import { Heart, Search, Upload } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative w-full h-129 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <motion.img
                    src={heroImage}
                    alt="People reuniting with their belongings"
                    className="w-full h-full object-cover opacity-38"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-10">
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 drop-shadow">
                            Lost Something?
                            <br />
                            <span className="bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                                Let&apos;s Find It Together
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                            Our community-driven platform helps reunite people with their lost
                            belongings. Post what you&apos;ve lost or found, and help make
                            someone&apos;s day brighter.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Link to="/report-items">
                                <Button
                                    size="lg"
                                    className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:bg-sky-400 text-white text-lg px-8 py-6 rounded shadow-lg hover:shadow-xl transition-transform hover:scale-105"
                                >
                                    <Upload className="h-5 w-5" />
                                    Report Found Item
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Link to="/search-lost-items">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex items-center gap-2 border-none text-gray-900 bg-white/80 hover:bg-blue-50 transition-all text-lg px-8 py-6 rounded shadow-sm"
                                >
                                    <Search className="h-5 w-5" />
                                    Search Lost Items
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-center gap-2 text-sm text-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        <Heart className="h-4 w-4 text-sky-600" />
                        <span className=" text-gray-700">Helping our community since 2025</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

