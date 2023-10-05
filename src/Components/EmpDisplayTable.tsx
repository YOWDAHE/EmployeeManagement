import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
// import { IconPencil, IconTrash } from "@tabler/icons-react";

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    phone: string;
  }[];
}

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

function EmpDisplayTable({ email, firstName, job, lastName, phone, deleteFunc, update}) {
  const theme = useMantineTheme();
  const rows = (
    <tr>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text fz="sm" fw={500}>
            {firstName}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text fz="sm" fw={500}>
            {lastName}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color="gray"
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {job}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {email}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={()=>{update(true)}}>
            {/* <IconPencil size="1rem" stroke={1.5} /> */}
            <FontAwesomeIcon icon={faPenToSquare} />
          </ActionIcon>
          <ActionIcon onClick={
            () => {
              let ans = confirm(`Are u sure you want to delete ${firstName} ${lastName}? `)
              if (ans) { 
                deleteFunc()
              }
            }
          } color="red">
            {/* <IconTrash size="1rem" stroke={1.5} /> */}
            <FontAwesomeIcon icon={faTrashCan} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );

  return (
    <tbody>{rows}</tbody>
  );
}

export default EmpDisplayTable;