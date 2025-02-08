import { useRef, useState } from "react";
import { BuilderPage } from "@buddy-builder/core/src";
import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import {
  Button,
  ContextMenu,
  EditInline,
  EditInlineRef,
  Tree,
} from "@buddy-builder/ui";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";

import { SectionHeader } from "../../shared";

export function PageList() {
  const builder = useBuddyInstance();
  const pages = useBuddyStore((_, builder) => builder.getPages());

  const [adding, setAdding] = useState<string>();

  const onAddPage = () => {
    if (adding) {
      const { id } = builder.addPage({
        name: adding,
        path: adding.toLowerCase().replace(/\s/g, "-"),
        content: [],
      });
      builder.selectPage(id);
    }
    setAdding(undefined);
  };

  return (
    <div className="flex flex-col h-full">
      <SectionHeader title="Pages">
        <Button icon size="sm" onClick={() => setAdding("New page")}>
          <PlusIcon size={12} />
        </Button>
      </SectionHeader>
      <div className="overflow-auto h-full pb-2 pt-1">
        <Tree className="px-2">
          {pages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
          {adding !== undefined && (
            <Tree.Item
              size="lg"
              label={
                <EditInline
                  value={adding}
                  outlined
                  editOnMount
                  onChange={setAdding}
                  onCancel={() => setAdding(undefined)}
                  onConfirm={onAddPage}
                />
              }
            />
          )}
        </Tree>
      </div>
    </div>
  );
}

const PageItem = ({ page }: { page: BuilderPage }) => {
  const editRef = useRef<EditInlineRef>(null);

  const builder = useBuddyInstance();
  const selectedPage = useBuddyStore((_, builder) =>
    builder.getSelectedPageId(),
  );

  const onNameChange = (id: string, name: string) => {
    if (!name) return;
    builder.updatePage(id, { name });
  };

  return (
    <ContextMenu
      rightClick
      trigger={
        <Tree.Item
          size="lg"
          className="cursor-pointer"
          onClick={() => builder.selectPage(page.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              builder.selectPage(page.id);
            }
          }}
          label={
            <EditInline
              ref={editRef}
              value={page.name}
              outlined
              onConfirm={(name) => onNameChange(page.id, name)}
            />
          }
          selected={selectedPage === page.id}
        />
      }
    >
      <ContextMenu.Title>{page.name}</ContextMenu.Title>
      <ContextMenu.Item onClick={() => editRef.current?.focus()}>
        <ContextMenu.Item.Pre>
          <Edit2Icon size={14} />
        </ContextMenu.Item.Pre>
        Rename
      </ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Title>Danger zone</ContextMenu.Title>
      <ContextMenu.Item onClick={() => builder.removePage(page.id)}>
        <ContextMenu.Item.Pre>
          <Trash2Icon size={14} />
        </ContextMenu.Item.Pre>
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  );
};
