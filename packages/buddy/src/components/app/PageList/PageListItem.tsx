import { useRef } from "react";
import { BuilderPage } from "@buddy-builder/core/src";
import { useBuddyInstance, useBuddyStore } from "@buddy-builder/react";
import {
  ContextMenu,
  EditInline,
  EditInlineRef,
  Tree,
} from "@buddy-builder/ui";
import {
  Edit2Icon,
  FileIcon,
  LayoutIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import { useAddPage } from "./useAddPage";

type PageListItemProps = {
  page: BuilderPage;
  parentId?: string;
};

export const PageListItem = ({ page, parentId }: PageListItemProps) => {
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
          <ContextMenu.Item>
            <ContextMenu.Item.Pre>
              <LayoutIcon size={14} />
            </ContextMenu.Item.Pre>
            Convert to layout
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
        <div className="flex items-center gap-2 text-nowrap">
          <FileIcon size={14} className="shrink-0" />
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
        <PageListItem key={page.id} page={page} parentId={parentId} />
      ))}
      {addingItem}
    </Tree.Item>
  );
};
