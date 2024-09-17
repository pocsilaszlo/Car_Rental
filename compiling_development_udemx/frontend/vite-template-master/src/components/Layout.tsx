import { Outlet } from "react-router-dom";
import { HeaderSimple } from "./HeaderSimple/HeaderSimple";


export default function Layout() {
  return (
    <div className="ui container">
      <HeaderSimple />
      <Outlet />
    </div>
  );
}