import { RouterProvider, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flexGrow: 1 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
