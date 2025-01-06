import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Watch from "./pages/Watch";
import ScrollToTop from "./components/ScrollToTop";
import Channel from "./pages/Channel";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";

function App() {
  const [filter, setfilter] = useState("home");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        className="offcanvas offcanvas-start bg-[#0c0c0c]"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <Sidebar
          filter={filter}
          setFilter={setfilter}
          setCategoryId={setCategoryId}
        />
      </div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home categoryId={categoryId} filter={filter} />}
        />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/channel/:channelId" element={<Channel />} />
        <Route path="/playlist/:channelId/:playlistId" element={<Playlist />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
