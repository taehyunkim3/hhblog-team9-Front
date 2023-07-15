import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateDesk from "../pages/CreateDesk";
import DeskDetail from "../pages/DeskDetail";
import NotFound from "../pages/NotFound";
import Room from "../pages/Room";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createdesk" element={<CreateDesk />} />
        <Route path="/deskdetail/:id" element={<DeskDetail />} />
        <Route path="/deskdetail/:id/room" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
