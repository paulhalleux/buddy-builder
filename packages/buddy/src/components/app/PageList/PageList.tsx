import { useRef, useState } from "react";
import { BuilderPage, PageType } from "@buddy-builder/core/src";
import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import {
  Button,
  ContextMenu,
  EditInline,
  EditInlineRef,
  EmptyState,
  Tree,
} from "@buddy-builder/ui";
import { Edit2Icon, FileIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { SectionHeader } from "../../shared";

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
      <div className="overflow-auto h-full">
        {pages.length || addingItem ? (
          <Tree className="px-2 pb-2 pt-1">
            {pages.map((page) => (
              <PageItem key={page.id} page={page} />
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

const PageItem = ({
  page,
  parentId,
}: {
  page: BuilderPage;
  parentId?: string;
}) => {
  const editRef = useRef<EditInlineRef>(null);

  const builder = useBuddyInstance();
  const selectedPage = useBuddyStore((_, builder) =>
    builder.getSelectedPageId(),
  );

  const isExpanded = useBuddyStore((_, builder) =>
    builder.getExpandedPages().includes(page.id),
  );

  const { startEditing, addingItem } = useAddPage(page.id);

  const onNameChange = (id: string, name: string) => {
    if (!name) return;
    builder.updatePage(id, { name });
  };

  return (
    <Tree.Item
      size="lg"
      className="cursor-pointer"
      expanded={isExpanded}
      renderItem={({ children }) => (
        <ContextMenu rightClick trigger={children}>
          <ContextMenu.Title>{page.name}</ContextMenu.Title>
          <ContextMenu.Item onClick={() => editRef.current?.focus()}>
            <ContextMenu.Item.Pre>
              <Edit2Icon size={14} />
            </ContextMenu.Item.Pre>
            Rename
          </ContextMenu.Item>
          <ContextMenu.Item onClick={startEditing}>
            <ContextMenu.Item.Pre>
              <PlusIcon size={14} />
            </ContextMenu.Item.Pre>
            Add page
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
      )}
      onExpand={(expanded) => {
        if (expanded) {
          builder.expandPage(page.id);
        } else {
          builder.collapsePage(page.id);
        }
      }}
      onClick={() => builder.selectPage(page.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          builder.selectPage(page.id);
        }
      }}
      label={
        <div className="flex items-center gap-2">
          <FileIcon size={14} />
          <EditInline
            ref={editRef}
            value={page.name}
            outlined
            onConfirm={(name) => onNameChange(page.id, name)}
          />
          <div className="w-0.5" />
        </div>
      }
      selected={selectedPage === page.id}
    >
      {page.pages.map((page) => (
        <PageItem key={page.id} page={page} parentId={parentId} />
      ))}
      {addingItem}
    </Tree.Item>
  );
};

const useAddPage = (parentId?: string) => {
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
