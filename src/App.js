import { UserMoment } from "./hooks/UserMoment";
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";
import { AddNode } from "./component/AddNode";
import { EditNode } from "./component/EditNode";
function App() {
  if (true) {
    return (
      <HashRouter>
        <div>
          {/* Set up your routes */}
          <Routes>
            <Route path="/" element={<div>manish</div>} />
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
              path="/preview-node/edit"
              element={
                <>
                  <EditNode />
                </>
              }
            />
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
