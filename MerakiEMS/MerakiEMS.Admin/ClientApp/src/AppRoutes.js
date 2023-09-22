import Login from "./components/Login";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import LeaveRender from "./components/LeaveRender";
import { EmployeesList } from "./components/EmployeesList";
import UserProfile from "./components/UserProfile";

const AppRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/leaves",
    element: <LeaveRender />,
  },

  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/addEmployees",
    element: <AddEmployee />,
  },
  {
    path: "/employees",
    element: <EmployeesList />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
];

export default AppRoutes;
