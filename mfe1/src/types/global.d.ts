// declare global {
//     interface Window {
//       app2Url: string;
//     }
//   }
  
//   export {};

declare module 'app2/App' {
  import React from 'react';
  const App: React.ComponentType<any>;
  export default App;
}

declare global {
  interface Window {
    app2Url: string;
    __SSR__?: boolean;
  }
}

export {};