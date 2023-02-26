import { ComponentMeta, ComponentStory } from "@storybook/react";

import Status from "./Status";

export default {
  title: "data-display/Status",
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => <Status {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sucesso",
  colors: "success",
};
