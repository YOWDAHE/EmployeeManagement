import "./index.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SingleEmployee from "./SingleEmployee";
import { Loader } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";
import NavBar from "./Components/NavBar";

interface employee {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  role: string;
}

function AvailableEmployees() {
  let { id, value } = useParams();
  let all = Object.values(useParams());

  const [employees, setEmployees] = useState<employee[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getEmployees"
      );
      setEmployees(response.data.data);
      setLoading(false);
    })();
  }, []);

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
      <div className="w-full self-center pt-5">
        <SingleEmployee
          firstName="First Name"
          lastName="Last Name"
          email="Email"
          phone="Phone Number"
          id="id"
          role="role"
          All={false}
        />
        {employees?.map((el) => {
          if (all.length > 0) {
            if (el.role == id) {
              return (
                <SingleEmployee
                  key={el.id}
                  email={el.email}
                  firstName={el.firstName}
                  lastName={el.lastName}
                  phone={el.phone}
                  id={el.id}
                  role={el.role}
                  All={false}
                />
              );
            }
          } else {
            return (
              <SingleEmployee
                key={el.id}
                email={el.email}
                firstName={el.firstName}
                lastName={el.lastName}
                phone={el.phone}
                id={el.id}
                role={el.role}
                All={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default AvailableEmployees;
