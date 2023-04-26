import { Meta, StoryObj } from "@storybook/react";
import ExpirationDateInput from "../FormInputs/ExpirationDateInput";

const meta = {
  component: ExpirationDateInput,
  title: "Input/ExpirationDate",
} satisfies Meta<typeof ExpirationDateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExpirationDateStory: Story = {
  args: {
    date: {
      month: "11",
      year: "26",
    },

    setDate: () => {},
  },
};
