import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StationsProvider } from "./components/context/StationsContext";
import { UserAuthContextProvider } from "./components/context/AuthContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/Dashboard";
import StationsList from "./components/pages/StationsList";
import StationDetails from "./components/pages/StationDetails";
import StationAdd from "./components/pages/StationAdd";
import StationEdit from "./components/pages/StationEdit";
import MapView from "./components/pages/MapView";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import NewPassword from "./components/pages/NewPassword";

const App = () => {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <StationsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/createnewpassword" element={<NewPassword />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="stations" element={<StationsList />} />
              <Route path="stations/:id" element={<StationDetails />} />
              <Route path="stations/add" element={<StationAdd />} />
              <Route path="stations/edit/:id" element={<StationEdit />} />
              <Route path="map" element={<MapView />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </StationsProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
