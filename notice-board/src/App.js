import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import NoticeBoard from "./pages/notice/NoticeBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice_board" element={<NoticeBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
