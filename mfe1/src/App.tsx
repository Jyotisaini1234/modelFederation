import React, { Suspense } from "react";

const RemoteApp2 = React.lazy(() =>
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
        <RemoteApp2 />
      </Suspense>
    </div>
  );
};

export default App;


// import React, { Suspense, lazy } from 'react';

// // Conditional import - only load remote module on client side
// const RemoteApp2 = typeof window !== 'undefined' 
//   ? lazy(() => import('app2/App').catch(() => ({ default: () => <div>App2 not available</div> })))
//   : () => <div>App2 (SSR fallback)</div>;

// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>Main App (MFE1)</h1>
//       <Suspense fallback={<div>Loading App2...</div>}>
//         <RemoteApp2 />
//       </Suspense>
//     </div>
//   );
// };

// export default App;