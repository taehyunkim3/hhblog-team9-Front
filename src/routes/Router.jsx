import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import CreateDesk from "../pages/CreateDesk/CreateDesk";
import DeskDetail from "../pages/DeskDetail/DeskDetail";
import NotFound from "../pages/NotFound/NotFound";
import Room from "../pages/Room/Room";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { QueryClient } from "@tanstack/react-query";
import ProtectedRoute from "./ProtectedRoute";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/createdesk"
          element={<ProtectedRoute element={<CreateDesk />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deskdetail/:id" element={<DeskDetail />} />
        {/* <Route path="/deskdetail/:id/room" element={<Room />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
