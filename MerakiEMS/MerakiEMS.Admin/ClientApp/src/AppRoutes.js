import Login from "./components/Login";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import Leave from "./components/Leave";



const AppRoutes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/leaves',
    element: <Leave/>
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
