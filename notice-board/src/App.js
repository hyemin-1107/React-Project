import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NoticeBoard from "./pages/NoticeBoard/NoticeBoard";
import CreateBoard from "./pages/CreateBoard/CreateBoard";

function App() {
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
