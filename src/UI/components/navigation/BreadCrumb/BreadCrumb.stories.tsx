import { ComponentMeta, ComponentStory } from "@storybook/react";

import BreadCrumb from "./BreadCrumb";

export default {
  title: "navigation/BreadCrumb",
  component: BreadCrumb,
} as ComponentMeta<typeof BreadCrumb>;

const Template: ComponentStory<typeof BreadCrumb> = (args) => (
  <BreadCrumb {...args} />
);

export const Default = Template.bind({});

Default.args = {
  items: ["Detalhes", "Identificação", "Pagamento"],
  selected: "Identificação",
};
