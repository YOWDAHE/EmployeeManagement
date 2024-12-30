import "./index.css";
import { NavLink, useParams } from "react-router-dom";
import EmployeeCRUD from "./EmployeeCRUD";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Input,
  Loader,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointLeft,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import NavBar from "./Components/NavBar";
import EmpDisplayTable from "./Components/EmpDisplayTable";

interface employee {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  role: string;
  lastLog: string;
  active: boolean;
}

function AllEmployees() {
  const [employees, setEmployees] = useState<employee[]>();
  const [roles, setRoles] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(true);
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
          <div className="flex items-center gap-x-10">
            <div className="flex items-center gap-x-2">
              <div
                onClick={() => setShowActive(true)}
                className={`px-3 py-1 rounded-sm text-sm hover:cursor-pointer ${
                  showActive ? "bg-green-600 text-white" : ""
                }`}
              >
                Active
              </div>
              <div
                onClick={() => setShowActive(false)}
                className={`px-3 py-1 rounded-sm text-sm hover:cursor-pointer ${
                  !showActive ? "bg-green-600 text-white" : ""
                }`}
              >
                Removed
              </div>
            </div>
            <NavLink
              className="flex items-center border rounded-xl px-2 mr-10 justify-self-end"
              to={"/role/register"}
            >
              <FontAwesomeIcon icon={faUser} />
              <div>+</div>
            </NavLink>
          </div>
        </div>
        <ScrollArea className="h-screen">
          <Table
            sx={{ minWidth: 800 }}
            verticalSpacing="sm"
            horizontalSpacing="lg"
          >
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Job title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Last Log</th>
                <th />
              </tr>
            </thead>
            {showActive
              ? employees?.map((el) => {
                  if (
                    el.firstName.toLowerCase().includes(search.toLowerCase()) &&
                    el.active
                  ) {
                    return (
                      <EmployeeCRUD
                        key={el.id}
                        email={el.email}
                        firstName={el.firstName}
                        lastName={el.lastName}
                        phone={el.phone}
                        id={el.id}
                        role={el.role}
                        lastLog={el.lastLog}
                        AllRoles={roles}
                        employees={employees}
                        el={el}
                        refresh={setRefresh}
                      />
                    );
                  }
                })
              : employees?.map((el) => {
                  if (
                    el.firstName.toLowerCase().includes(search.toLowerCase()) &&
                    !el.active
                  ) {
                    return (
                      <EmployeeCRUD
                        key={el.id}
                        email={el.email}
                        firstName={el.firstName}
                        lastName={el.lastName}
                        phone={el.phone}
                        id={el.id}
                        role={el.role}
                        lastLog={el.lastLog}
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
