import Dashboard from "./views/Dashboard.jsx";
import CoinsPage from "./views/CoinsPage.jsx";
import NewsPage from "./views/NewsPage.jsx";
import Portfolio from "./views/Portfolio.jsx";
import Settings from "./views/Settings.jsx";
import Login from "./views/pages/Login.jsx";
import Register from "./views/pages/Register.jsx";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: "tim-icons icon-wallet-43",
    component: Portfolio,
    layout: "/admin"
  },
  {
    path: "/coins",
    name: "Coins",
    icon: "tim-icons icon-coins",
    component: CoinsPage,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "News",
    icon: "tim-icons icon-paper",
    component: NewsPage,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "tim-icons icon-settings-gear-63",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "tim-icons icon-settings-gear-63",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "tim-icons icon-settings-gear-63",
    component: Register,
    layout: "/auth"
  }
];

export default routes;
