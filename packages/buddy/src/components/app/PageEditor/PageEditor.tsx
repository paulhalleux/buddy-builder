import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import { Button, Input } from "@buddy-builder/ui";
import { Trash2 } from "lucide-react";

import { SectionHeader } from "../../shared";

export function PageEditor() {
  const builder = useBuddyInstance();
  const selectedPage = useBuddyStore((_, builder) => builder.getSelectedPage());

  const onDeletePage = () => {
    if (selectedPage) {
      builder.removePage(selectedPage.id);
      const firstPage = builder.getPages()[0];
      if (firstPage) {
        builder.selectPage(firstPage.id);
      }
    }
  };

  return (
    <div>
      <SectionHeader title="Page">
        {selectedPage && (
          <Button icon onClick={onDeletePage}>
            <Trash2 size={12} />
          </Button>
        )}
      </SectionHeader>
      <div className="p-2 flex flex-col gap-2">
        <Input
          size="md"
          value={selectedPage?.name}
          onChange={(e) =>
            builder.updatePage(selectedPage!.id, { name: e.target.value })
          }
        />
        <Input
          size="md"
          value={selectedPage?.path}
          prepend="/"
          onChange={(e) =>
            builder.updatePage(selectedPage!.id, { path: e.target.value })
          }
        />
      </div>
    </div>
  );
}
