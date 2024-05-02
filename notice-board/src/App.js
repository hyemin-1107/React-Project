import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NoticeBoard from "./pages/NoticeBoard/NoticeBoard";
import CreateBoard from "./pages/CreateBoard/CreateBoard";
import BoardDetailView from "./pages/BoardDetailView/BoardDetailView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/board-detail-view" element={<BoardDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
