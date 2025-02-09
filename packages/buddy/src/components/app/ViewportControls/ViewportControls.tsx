import { Button } from "@buddy-builder/ui";

import { ViewportModes } from "../WebsiteEditor/WebsiteEditor.tsx";

type ViewportControlsProps = {
  viewportMode: keyof typeof ViewportModes;
  setViewportMode: (mode: keyof typeof ViewportModes) => void;
};

export function ViewportControls({
  viewportMode,
  setViewportMode,
}: ViewportControlsProps) {
  return (
    <div className="w-full flex justify-center space-x-2">
      {Object.keys(ViewportModes).map((mode) => (
        <Button
          key={mode}
          intent={viewportMode === mode ? "secondary" : "primary"}
          onClick={() => setViewportMode(mode as keyof typeof ViewportModes)}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
}
