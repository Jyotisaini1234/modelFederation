// import App from "./App";
// import React from "react";
// import { createRoot } from 'react-dom/client';

// const root = createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);

import App from "./App";
import React from "react";
import { createRoot, hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;

if ((window as any).__SSR__) {
  hydrateRoot(container, <App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}