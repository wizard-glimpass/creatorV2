import { UserMoment } from "./hooks/UserMoment";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";
import { AddNode } from "./component/AddNode";
import { EditNode } from "./component/EditNode";
import PreviewNodes from "./component/PreviewNodes";
import PreviewTrip from "./component/PreviewTrip";
import CreateTrip from "./component/CreateTrip";
import Homepage from "./component/Homepage";
import Header from "./common/Header";
import MarketSelection from "./component/MarketSelection";
import Snackbar from "./common/Snackbar";

function App() {
  if (true) {
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
              path="/preview-node/edit/:nodeIndex"
              element={
                <>
                  <EditNode />
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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
