import React, { useState } from 'react';
import {
	faPenToSquare,
	faTrashCan,
	faBell,
} from "@fortawesome/free-regular-svg-icons";
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

// Modal Component
const Modal = ({ show, handleClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="mb-4">This employee has been inactive for 6 months and will be removed from the list.</h2>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleClose}>Okay</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleClose}>Don't remove</button>
        </div>
      </div>
    </div>
  );
};

function EmpDisplayTable({
	lastLog,
	email,
	firstName,
	job,
	lastName,
	phone,
	deleteFunc,
	update,
}) {
	const theme = useMantineTheme();
	const [showModal, setShowModal] = useState(false);

	const handleDivClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

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
				<Text fz="sm" c="dimmed">
					{lastLog}
				</Text>
			</td>
			<td>
				{lastLog === "6 months ago" ? (
					<div className="flex justify-end pr-5 hover:cursor-pointer text-red-600 font-semibold" onClick={handleDivClick}>
						Restore
					</div>
				) : (
					<Group spacing={0} position="right">
						<ActionIcon
							onClick={() => {
								update(true);
							}}
						>
							{/* <IconPencil size="1rem" stroke={1.5} /> */}
							<FontAwesomeIcon icon={faPenToSquare} />
						</ActionIcon>
						<ActionIcon
							onClick={() => {
								let ans = confirm(
									`Are u sure you want to delete ${firstName} ${lastName}? `
								);
								if (ans) {
									deleteFunc();
								}
							}}
							color="red"
						>
							{/* <IconTrash size="1rem" stroke={1.5} /> */}
							<FontAwesomeIcon icon={faTrashCan} />
						</ActionIcon>
					</Group>
				)}
			</td>
		</tr>
	);

	return (
		<>
			<tbody>{rows}</tbody>
			<Modal show={showModal} handleClose={handleCloseModal} />
		</>
	);
}

export default EmpDisplayTable;
