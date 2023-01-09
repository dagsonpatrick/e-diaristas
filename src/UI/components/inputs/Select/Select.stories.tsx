import { MenuItem } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Select from "./Select";

export default {
  title: "inputs/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <MenuItem value={""}>Selecione um item</MenuItem>
    <MenuItem value={10}>Dez</MenuItem>
    <MenuItem value={20}>Vinte</MenuItem>
    <MenuItem value={30}>Trinta</MenuItem>
  </Select>
);

export const Default = Template.bind({});

Default.args = {
  label: "Números",
  value: 20,
};
