import { Control, ControlType } from "../types/control.ts";
import { BlockDefinition } from "../types/block.ts";

const createBlockDefinition = <Controls extends Record<string, Control>>(
  definition: BlockDefinition<Controls>,
) => definition;

export const HeaderBlockDefinition = createBlockDefinition({
  id: "header",
  type: "header",
  name: "Header",
  controls: {
    title: {
      type: ControlType.Text,
      label: "Title",
    },
  },
  renderer: ({ controls }) => (
    <header>
      <h1>{controls.title}</h1>
    </header>
  ),
});
