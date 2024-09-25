import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import WelcomePage from '../components/WelcomePage';
import UserHomePage from '../components/UserHomePage';
import Layout from './Layout';
import ItemsPage from '../components/Inventory';
import EquipmentPage from '../components/Inventory/Equipment/equipment';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: '/home',
        element: <UserHomePage />,
      },
      {
        path: '/inventory/items',
        element: <ItemsPage />,
      },
      {
        path: '/inventory/equipment',
        element: <EquipmentPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },

    ],
  },
]);
