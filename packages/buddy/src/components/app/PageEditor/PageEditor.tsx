import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import { Button, Collapsible, EmptyState, Input } from "@buddy-builder/ui";
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
      } else {
        builder.deselectPage();
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SectionHeader title="Page">
        {selectedPage && (
          <Button icon onClick={onDeletePage}>
            <Trash2 size={12} />
          </Button>
        )}
      </SectionHeader>
      <div className="overflow-auto">
        {selectedPage ? (
          <div className="flex flex-col rounded-sm gap-[1px] min-w-full w-fit px-2 pb-2 pt-1">
            <Collapsible defaultOpen>
              <Collapsible.Trigger className="select-none">
                General
              </Collapsible.Trigger>
              <Collapsible.Content className="flex flex-col gap-2 pb-2">
                <Input
                  size="md"
                  value={selectedPage?.name}
                  onChange={(e) =>
                    builder.updatePage(selectedPage!.id, {
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  size="md"
                  value={selectedPage?.path}
                  prepend="/"
                  onChange={(e) =>
                    builder.updatePage(selectedPage!.id, {
                      path: e.target.value,
                    })
                  }
                />
              </Collapsible.Content>
            </Collapsible>
            <Collapsible>
              <Collapsible.Trigger className="select-none">
                Subpages
              </Collapsible.Trigger>
              <Collapsible.Content className="flex flex-col gap-2"></Collapsible.Content>
            </Collapsible>
            <Collapsible>
              <Collapsible.Trigger className="select-none">
                Settings
              </Collapsible.Trigger>
              <Collapsible.Content className="flex flex-col gap-2"></Collapsible.Content>
            </Collapsible>
          </div>
        ) : (
          <div className="h-16">
            <EmptyState description={"Select a page to edit"} />
          </div>
        )}
      </div>
    </div>
  );
}
