import React from "react";
import { NavLink } from "react-router-dom";

//用户首页
export default function Home() {
  return (
    <div className="kyzr-navLink">
      <h2>登录注册界面首页</h2>
      <div className="kyzr-navList">
        <NavLink to="/register" className="myNavLink">
          注册
        </NavLink>
        <NavLink to="/login" className="myNavLink">
          登录
        </NavLink>
      </div>
    </div>
  );
}
