import Login from "./components/Login";
import Home from "./components/Home";



const AppRoutes = [
  {
    path: '/',
    element: <Login />
  },
  
  {
    path: '/home',
    element: <Home />
  }
  
];

export default AppRoutes;
