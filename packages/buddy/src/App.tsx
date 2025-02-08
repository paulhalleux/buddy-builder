import { BuddyProvider, useBuddy } from "@buddy-builder/react";

import { WebsiteEditor } from "./components/app";

export function App() {
  const builder = useBuddy({});
  return (
    <BuddyProvider value={builder}>
      <div className="h-screen w-screen flex flex-col">
        <div className="h-12 border-b border-neutral-200 bg-white">Header</div>
        <WebsiteEditor />
      </div>
    </BuddyProvider>
  );
}
