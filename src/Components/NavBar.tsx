import React from "react";

import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faBell } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
			<Box className="sticky top-0 w-full z-10">
				<Header height={60} px="md">
					<Group position="apart" sx={{ height: "100%" }}>
						<Group
							sx={{ height: "100%" }}
							spacing={0}
							className={classes.hiddenMobile}
						>
							<NavLink to={"/role/add"} className={classes.link}>
								Home
							</NavLink>
							<NavLink to={"/employee/All"} className={classes.link}>
								Employees
							</NavLink>
						</Group>

						<Group className={classes.hiddenMobile}>
							{/* <Button variant="default">Log in</Button> */}
							<NavLink to={"/feedback"} className={classes.link}>
								<FontAwesomeIcon icon={faBell} size="lg" />
							</NavLink>
							<NavLink to={"/"} className={classes.link}>
								<Button variant="default">Log in</Button>
							</NavLink>
							{/* <Button>Sign up</Button> */}
						</Group>

						<Burger
							opened={drawerOpened}
							onClick={toggleDrawer}
							className={classes.hiddenDesktop}
						/>
					</Group>
				</Header>

				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					padding="md"
					title="Navigation"
					className={classes.hiddenDesktop}
					zIndex={1000000}
				>
					<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
						<Divider
							my="sm"
							color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
						/>

						<NavLink to={"/tree"} className={classes.link}>
							Home
						</NavLink>
						<NavLink to={"/tree"} className={classes.link}>
							Home
						</NavLink>
						<NavLink to={"/tree"} className={classes.link}>
							Home
						</NavLink>

						<Divider
							my="sm"
							color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
						/>

						<Group position="center" grow pb="xl" px="md">
							<Button variant="default">Log in</Button>
							{/* <Button>Sign up</Button> */}
						</Group>
					</ScrollArea>
				</Drawer>
			</Box>
		);
}

export default NavBar;
