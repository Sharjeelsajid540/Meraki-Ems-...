import Login from "./components/Login";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import AppComp from "./components/AppComp";



const AppRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/addEmployees',
    element: <AddEmployee />
  }
  ,
  {
    path: '/check-in-out',
    element: <AppComp />
  }
  
];

export default AppRoutes;
