import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BuddyProvider, useBuddy } from "@buddy-builder/react";

import { WebsiteEditor } from "./components/app";

export function Builder() {
  const builder = useBuddy({});
  return (
    <BuddyProvider value={builder}>
      <div className="h-screen w-screen flex flex-col">
        <div className="h-12 border-b border-neutral-200 bg-white shrink-0">
          Header
        </div>
        <WebsiteEditor />
      </div>
    </BuddyProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route
          path="/__canvas"
          element={
            <div className="h-screen w-screen flex items-center justify-center">
              <h1>Canvas</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
