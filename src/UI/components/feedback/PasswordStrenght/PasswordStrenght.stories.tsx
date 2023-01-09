import { ComponentMeta, ComponentStory } from "@storybook/react";

import PasswordStrenght from "./PasswordStrenght";

export default {
  title: "feedback/PasswordStrenght",
  component: PasswordStrenght,
} as ComponentMeta<typeof PasswordStrenght>;

const Template: ComponentStory<typeof PasswordStrenght> = (args) => (
  <PasswordStrenght {...args} />
);

export const Default = Template.bind({});

Default.args = {
  password: "",
};
