// import logo from "./logo.svg";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import components
import Layout from "./pages/Layout";
import ProductList from "./pages/ProductList/ProductList";
import Chat from "./pages/Chat/Chat";
import Dashboard from "./pages/DashBoard/Dashboard";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import LogIn, { action as loginAction } from "./pages/Login";
import SignUp from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import ChatSection from "./pages/Chat/ChatSection";
import InitialChatSection from "./pages/Chat/InitialChatSection";
import ProtectedRoute from "./pages/ProtectRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Dashboard></Dashboard>} />,
      },
      {
        path: "order/:orderId",
        element: <ProtectedRoute element={<OrderDetail></OrderDetail>} />,
      },
      {
        path: "edit/:productId",
        element: <ProtectedRoute element={<EditProduct></EditProduct>} />,
      },
      {
        path: "/chat",
        element: <ProtectedRoute element={<Chat></Chat>} />,
        children: [
          {
            path: ":roomId",
            element: <ChatSection />,
          },
          {
            index: true,
            element: <InitialChatSection />,
          },
        ],
      },
      {
        path: "/products",
        element: <ProtectedRoute element={<ProductList></ProductList>} />,
      },
      {
        path: "/create-product",
        element: <ProtectedRoute element={<CreateProduct></CreateProduct>} />,
      },
    ],
  },

  {
    path: "/login",
    element: <LogIn></LogIn>,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
