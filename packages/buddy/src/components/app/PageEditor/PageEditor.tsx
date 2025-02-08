import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import { Button } from "@buddy-builder/ui";
import { Trash2 } from "lucide-react";

import { SectionHeader } from "../../shared";

export function PageEditor() {
  const builder = useBuddyInstance();
  const selectedPage = useBuddyStore((_, builder) => builder.getSelectedPage());
  return (
    <div>
      <SectionHeader title="Page">
        {selectedPage && (
          <Button icon onClick={() => builder.removePage(selectedPage.id)}>
            <Trash2 size={12} />
          </Button>
        )}
      </SectionHeader>
    </div>
  );
}
