// const tree = require("./Resouces/tree.json") as t;
import { useEffect, useState } from "react";
// import {Tree} from "./Resouces/Tree.js";
import "./index.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ChevronIcon, Collapse, Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTree, setTree } from "./features/TreeSlice";
import NavBar from "./Components/NavBar";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faCircleDown } from "@fortawesome/free-regular-svg-icons";

// const Tree: t = axios.get("127.0.0.1:8000/tree");
// let Tree: t = {
//     value: "no data",
//     children: []
// };
function TreePage() {
  interface t {
    value: string;
    id: number;
    description: string;
    children: t[];
  }
  interface rolesInterface {
    name: string;
    id: number;
    parentID: number | null;
  }

  const dispatch = useDispatch();
  const { Tree, isLoading } = useSelector((state) => state.Tree);
  // const [Tree, setTree] = useState();
  const [roles, setRoles] = useState<rolesInterface | []>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [collapseState, setCollabse] = useState(false);
  const [isRotated, setIsRotated] = useState(false);


  useEffect(() => {
    dispatch(fetchTree());
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const Ans = await axios.get(
  //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getTree"
  //     );
  //     const Allroles = Ans.data.data;
  //     setTree(Allroles);
  //     setLoading(false);
  //     console.log("tree>>>", Tree);
  //   })();
  // }, []);
  const ChildNode = ({ child, prefix, childNum, childLength }) => {
    const [close, setClose] = useState(true);
    let childPrefix: string = "";
    if (childNum) {
      if (childNum > 1) {
        childPrefix = prefix + "  |   ";
      } else {
        childPrefix = prefix + "      ";
      }
    }
    return dfs(child, false, childPrefix, childLength, close, setClose);
  };

  function dfs(
    node: t,
    isRoot = true,
    prefix = "",
    childNum?: number,
    closeBtn = true,
    toggle
  ) {
    const children = node.children.map((child, i) => {
      const isLastChild = i === node.children.length - 1;
      const childLength = node.children.length;
      console.log("tree closed >> ", closeBtn);

      // let childPrefix: string = "";
      // if (childNum) {
      //   if (childNum > 1) {
      //     childPrefix = prefix + "  |   ";
      //   } else {
      //     childPrefix = prefix + "      ";
      //   }
      // }

      // return dfs(child, false, childPrefix, childLength);
      
      return (
        <ChildNode
          key={i}
          child={child}
          prefix={prefix}
          childNum={childNum}
          childLength={childLength}
        />
      );
    });


    return (
      <div key={node.value} className="">
        {isRoot && (
          <>
            <NavLink
              to={`/employee/${node.id}/${node.value}`}
              onMouseOver={() => {
                setDescription(node.description);
              }}
              className="hover:text-gray-900 "
            >
              {node.value}
            </NavLink>
          </>
        )}
        <span className="text-gray-600">{!isRoot && prefix + "  └──"}</span>
        {!isRoot && (
          <>
            <NavLink
              to={`/employee/${node.id}/${node.value}`}
              onMouseOver={() => {
                setDescription(node.description);
              }}
              className="hover:text-gray-900 hover:pl-3 transition-all transition-duration-200ms"
            >
              {"  "}
              {node.value}
            </NavLink>
            <i className="fa-sharp fa-light fa-chevron-down"></i>
            {/* <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className="ml-5"
              onClick={() => toggle((state) => !state)}
            /> */}
            {node.children.length != 0 && <ChevronIcon
              className={
                closeBtn == true ? "inline ml-5" : "inline ml-5 rotate-180"
              }
              onClick={() => {
                toggle((state) => !state);
              }}
            />}
          </>
        )}
        <Collapse in={closeBtn}>
          <pre>{children}</pre>
        </Collapse>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <div className="flex">
          <div className=" flex flex-col  gap-4 leading-[28px] flex-1 pl-5 pt-3  text-gray-800 text-lg border-gray-200 border-r-[1px]">
            <p className="justify-self-start self-center text-xs text-gray-400">
              Click to see employees
            </p>
            <div className="pl-5">{dfs(Tree)}</div>
          </div>
          <div
            className="flex justify-center items-center flex-1 h-[100vh] w-full text-center tracking-wide text-gray-600 text-lg font-bold "
            onMouseOver={() => setDescription("")}
          >
            {!(description == "") && (
              <div className="h-[100vh] flex flex-col justify-center">
                <p className="flex-1 text-center flex items-center justify-center text-xs text-gray-400">
                  hover over here for more options
                </p>
                <p className="flex-1">{description}</p>
              </div>
            )}
            {description == "" && (
              <div className="flex flex-col items-center gap-5 mt-[-100px]">
                <p className="mb-5 text-xl">Welcome</p>
                <div className="flex gap-3">
                  <NavLink
                    to={"/employee/All"}
                    className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    All Employees
                  </NavLink>
                  <NavLink
                    to={"/role/register"}
                    className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Add Employee
                  </NavLink>
                </div>

                <NavLink
                  to={"/role/add"}
                  className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Update Roles
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TreePage;
