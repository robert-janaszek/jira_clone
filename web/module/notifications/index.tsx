import { NotificationProps, showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

export const showSuccessNotification = (props: NotificationProps) => showNotification({
  color: 'teal',
  autoClose: 5000,
  icon: <Check />,
  ...props,
});