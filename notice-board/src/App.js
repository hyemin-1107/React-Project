import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage/MainPage";
import NoticeBoard from "./pages/NoticeBoard/NoticeBoard";
import CreateNewBoard from "./pages/CreateNewBoard/CreateNewBoard";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/create-board" element={<CreateNewBoard />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
