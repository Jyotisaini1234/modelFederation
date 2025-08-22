import React, { Suspense } from "react";

const RemoteApp = React.lazy(() =>
  import("app2/App").catch(() => ({
    default: () => (
      <div style={{ padding: "20px", color: "red", border: "1px solid red",textAlign: "center" }}>
        <h3>Failed to load Remote App</h3>
        <p>Make sure app2 is running on port 3002</p>
      </div>
    ),
  }))
);

const App: React.FC = () => {
  return (
    <div>
      <div style={{
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "greenyellow"
      }}>
        <h1>Product Listing</h1>
      </div>
      <Suspense fallback={<div>Loading Remote App...</div>}>
        <RemoteApp />
      </Suspense>
    </div>
  );
};

export default App;