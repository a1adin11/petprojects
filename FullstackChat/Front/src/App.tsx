import { Route, Routes } from "react-router";

import "./scss/App.scss";

import LoginPage from "./pages/loginPage/login.page.tsx";
import RegisterPage from "./pages/registerPage/register.page";
import HomePage from "./pages/homePage/home.page.tsx";
import Layout from "./components/layout/layout.tsx";
import UserPage from "./pages/userPage/user.page.tsx";
import FullPost from "./pages/fullPost/fullPost.tsx";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/user:id" element={<UserPage />} />
        <Route path="/post:id" element={<FullPost />} />
      </Route>
    </Routes>
  );
}

export default App;
