import { useState } from "react";
import { PageType } from "@buddy-builder/core/src";
import { useBuddyInstance } from "@buddy-builder/react";
import { EditInline, Tree } from "@buddy-builder/ui";

export const useAddPage = (parentId?: string) => {
  const builder = useBuddyInstance();
  const [adding, setAdding] = useState<string>();

  const addPage = (name: string) => {
    const { id } = builder.addPage(
      {
        type: PageType.Page,
        name,
        path: name.toLowerCase().replace(/\s/g, "-"),
      },
      parentId,
    );
    builder.selectPage(id);
  };

  const startEditing = () => {
    setAdding("New page");
    if (parentId) builder.expandPage(parentId);
  };

  const addingItem =
    adding !== undefined ? (
      <Tree.Item
        size="lg"
        label={
          <EditInline
            value={adding}
            outlined
            editOnMount
            onChange={setAdding}
            onCancel={() => setAdding(undefined)}
            onConfirm={(value) => {
              setAdding(undefined);
              if (!value) return;
              addPage(value);
            }}
          />
        }
      />
    ) : null;

  return { startEditing, addingItem };
};
