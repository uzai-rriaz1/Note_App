import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Pageloader from "./features/Pageloader.jsx";
import { Suspense } from "react";

const CreateNote = lazy(() => import("./features/createNote.jsx"));
const Updatenote = lazy(() => import("./features/Updatenote.jsx"));
const FetchNotes = lazy(() => import("./features/fetchNotes.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Pageloader />}>
          <Routes>
            <Route element={<App />} path="/">
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:id/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <FetchNotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createnote"
                element={
                  <ProtectedRoute>
                    <CreateNote />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updatenote/:id"
                element={
                  <ProtectedRoute>
                    <Updatenote />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
