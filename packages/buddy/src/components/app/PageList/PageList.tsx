import { useBuddyStore } from "@buddy-builder/react";
import { Button, EmptyState, Tree } from "@buddy-builder/ui";
import { PlusIcon } from "lucide-react";

import { SectionHeader } from "../../shared";

import { PageListItem } from "./PageListItem.tsx";
import { useAddPage } from "./useAddPage.tsx";

export function PageList() {
  const pages = useBuddyStore((_, builder) => builder.getPages());

  const { startEditing, addingItem } = useAddPage();

  return (
    <div className="flex flex-col h-full">
      <SectionHeader title="Pages">
        <Button icon size="sm" onClick={startEditing}>
          <PlusIcon size={12} />
        </Button>
      </SectionHeader>
      <div className="overflow-auto">
        {pages.length || addingItem ? (
          <Tree className="px-2 pb-2 pt-1">
            {pages.map((page) => (
              <PageListItem key={page.id} page={page} />
            ))}
            {addingItem}
          </Tree>
        ) : (
          <div className="h-16">
            <EmptyState description="Add a new page to get started" />
          </div>
        )}
      </div>
    </div>
  );
}
