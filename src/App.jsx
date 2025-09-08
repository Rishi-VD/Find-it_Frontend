import { Toaster } from "./components/ui/sonner";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import PostItem from "./pages/PostItem";
import ReportItem from "./pages/ReportItem";
import ReportFoundItems from "./pages/ReportFoundItems";
import SearchLostItems from "./pages/SearchLostItems";
import ViewAllLostItems from "./pages/ViewAllLostItems";
import SuccessStories from "./pages/SuccessStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/report-items" element={<ReportItem />} />
          <Route path="/report-found-item" element={<ReportFoundItems />} />
          <Route path="/search-lost-items" element={<SearchLostItems />} />
          <Route path="/view-all-lost-items" element={<ViewAllLostItems />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
