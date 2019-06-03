import ReactTables from "./views/tables/ReactTables.jsx";
import ExtendedTables from "./views/tables/ExtendedTables.jsx";
import ValidationForms from "./views/forms/ValidationForms.jsx";
import ExtendedForms from "./views/forms/ExtendedForms.jsx";
import RegularForms from "./views/forms/RegularForms.jsx";
import Charts from "./views/Charts.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Buttons from "./views/components/Buttons.jsx";
import SweetAlert from "./views/components/SweetAlert.jsx";
import Icons from "./views/components/Icons.jsx";
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
    name: "Settings",
    icon: "tim-icons icon-settings-gear-63",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Settings",
    icon: "tim-icons icon-settings-gear-63",
    component: Register,
    layout: "/auth"
  },
  {
    collapse: true,
    name: "Components",
    icon: "tim-icons icon-molecule-40",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "tim-icons icon-chart-bar-32",
    component: Charts,
    layout: "/admin"
  }
];

export default routes;
