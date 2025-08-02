import { Navigate, Outlet } from "react-router";
import Header from "../components/Header";
import getSessionItem from "../components/getSessionItem";


export default function DashboardLayout() {
  // const token = localStorage.getItem("tkn")
  const token = getSessionItem("tkn")
  return (
    token ?
    <main className=" min-h-svh">
      <Header />
      <Outlet />
    </main>
    :
    <Navigate to={"/"}/>
  );
}
