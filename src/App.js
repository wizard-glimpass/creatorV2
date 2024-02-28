import { UserMoment } from "./hooks/UserMoment";
import { HashRouter, Route, Routes } from "react-router-dom";

import { AddNode } from "./component/AddNode";
import { EditNode } from "./component/EditNode";
import { AdminEditNode } from "./component/AdminEditNode";
import PreviewNodes from "./component/PreviewNodes";
import PreviewTrip from "./component/PreviewTrip";
import CreateTrip from "./component/CreateTrip";
import Homepage from "./component/Homepage";
import Header from "./common/Header";
import MarketSelection from "./component/MarketSelection";
import Snackbar from "./common/Snackbar";
import ValidateAngle from "./component/ValidateAngle";
import ValidateTrip from "./component/ValidateTrip";
import LoginPage from "./common/Login";
import "./App.scss";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Here you would validate the token with the backend
      setAuth(true);
    }
  }, []);

  return (
    <HashRouter>
      <div>
        <Header />
        <Snackbar />

        {/* Set up your routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
              </>
            }
          />
          <Route
            path="/add-node"
            element={
              <>
                <AddNode />
                <UserMoment />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          <Route
            path="/preview-node/edit/:nodeIndex"
            element={
              <>
                <EditNode />
              </>
            }
          />
          <Route
            path="/edit-node/nodes/:nodeId"
            element={
              <>
                <AdminEditNode />
              </>
            }
          />
          <Route
            path="/create-trip"
            element={
              <>
                <UserMoment />
                <CreateTrip />
              </>
            }
          />
          <Route
            path="/validate-angles"
            element={
              <>
                <UserMoment />
                <ValidateAngle />
              </>
            }
          />
          <Route
            path="/validate-trip"
            element={
              <>
                <UserMoment />
                <ValidateTrip />
              </>
            }
          />
          <Route
            path="/market-selection"
            element={
              <>
                <MarketSelection />
              </>
            }
          />
          <Route
            path="/preview-node"
            element={
              <>
                <PreviewNodes />
              </>
            }
          />
          <Route path="/preview-trip" element={<PreviewTrip />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
