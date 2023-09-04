import Login from "./components/Login";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";



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
  
];

export default AppRoutes;
