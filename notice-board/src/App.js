import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NoticeBoard from "./pages/NoticeBoard/NoticeBoard";
import CreateBoard from "./pages/CreateBoard/CreateBoard";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isReload", "true");
    };
    const handleUnload = () => {
      if (!sessionStorage.getItem("isReload")) {
        localStorage.removeItem("token");
      } else {
        sessionStorage.removeItem("isReload");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path="/create-board" element={<CreateBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
