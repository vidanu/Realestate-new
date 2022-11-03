import React from "react";
import { Redirect } from "react-router-dom";

// Profile

// Authentication related pages

//CBE Real Estate
import RERegister from "RealEstateCbe/pages/auth/RERegister";
import RELogin from "RealEstateCbe/pages/auth/RELogin";

// Dashboard
import Dashboard from "../RealEstateCbe/pages/user/Dashboard/RElandingGrid";
import REregisterProperty from "RealEstateCbe/pages/user/Property/REregisterProperty";
import REProjectOverview from "RealEstateCbe/pages/user/Dashboard/REProjectOverview";
import REuserProfile from "RealEstateCbe/pages/user/Profile/REuserProfile";
//Admin
import Admin from "RealEstateCbe/pages/admin/Admin";
import UserList from "RealEstateCbe/pages/admin/usersList";
import UserDetails from "RealEstateCbe/pages/admin/UserDetails";
const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/RESellProperty", component: REregisterProperty },
  { path: "/REprojectoverview", component: REProjectOverview },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  // { path: "/RElogin", component: RELogin },
  { path: "/REregister", component: RERegister },
  { path: "/dashboard", component: Dashboard },
  { path: "/REprojectoverview", component: REProjectOverview },
];
const privateRoutes = [{ path: "/RElogin", component: RELogin }];
const adminRoutes = [
  //Admin Page
  { path: "/admin-page", component: Admin },
  { path: "/userlist-page", component: UserList },
  { path: "/user-Detail", component: UserDetails },
];
export { publicRoutes, authProtectedRoutes, privateRoutes, adminRoutes };
