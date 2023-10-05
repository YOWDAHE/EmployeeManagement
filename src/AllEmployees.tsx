import "./index.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeCRUD from "./EmployeeCRUD";
import {
  Input,
  Loader,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft, faPlusSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import NavBar from "./Components/NavBar";
import EmpDisplayTable from "./Components/EmpDisplayTable";

interface employee {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  role: string;
}

function AllEmployees() {
  const [employees, setEmployees] = useState<employee[]>();
  const [roles, setRoles] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    setLoading(true);
    console.log("refresh called");
    (async () => {
      const response = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getEmployees"
      );
      const response2 = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getRoles"
      );
      setEmployees(response.data.data);
      setRoles(response2.data.data);
      setLoading(false);
    })();
  }, [refresh]);

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-[100vh]">
      <NavBar />
      <div className="w-[90%] pt-5 self-center">
        <div className="flex items-center w-full justify-between">
          <Input
            placeholder={"Search"}
            className="w-[500px] mb-5"
            onChange={(event) => setSearch(event.target.value)}
          />
          <NavLink
            className="flex items-center border rounded-xl px-2 mr-10 justify-self-end"
            to={"/role/register"}
          >
            <FontAwesomeIcon icon={faUser} />
            <div>+</div>
          </NavLink>
        </div>
        <ScrollArea className="h-screen">
          <Table
            sx={{ minWidth: 800 }}
            verticalSpacing="sm"
            horizontalSpacing="lg"
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Job title</th>
                <th>Email</th>
                <th>Phone</th>
                <th />
              </tr>
            </thead>

            {/* <EmployeeCRUD
              firstName="First Name"
              lastName="Last Name"
              email="Email"
              phone="Phone Number"
              id="id"
              role="role"
              AllRoles="all"
              employees="employees"
              el="el"
              refresh={setRefresh}
            /> */}
            {employees?.map((el) => {
              if (el.firstName.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <EmployeeCRUD
                    key={el.id}
                    email={el.email}
                    firstName={el.firstName}
                    lastName={el.lastName}
                    phone={el.phone}
                    id={el.id}
                    role={el.role}
                    AllRoles={roles}
                    employees={employees}
                    el={el}
                    refresh={setRefresh}
                  />
                );
              }
            })}
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AllEmployees;
