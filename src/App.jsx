import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Home, Login, Register, About, Contact } from "./pages";

// layout
import MainLayout from "./layouts/MainLayout";

// actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as HomeAction } from "./pages/Home";

import { ProtectedRoutes } from "./components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { isAuthChange, login } from "./app/userSlice";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        // {
        //   path: "/about",
        //   element: <About />,
        // },
        // {
        //   path: "/contact",
        //   element: <Contact />,
        // },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName && user?.photoURL) {
        dispatch(login(user));
      }
      dispatch(isAuthChange());
    });
  }, []);
  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
