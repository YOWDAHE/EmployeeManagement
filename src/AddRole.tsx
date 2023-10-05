import { Collapse, Input, Loader, ChevronIcon } from "@mantine/core";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import AddRoleForm from "./AddRoleForm";
import DeleteRole from "./DeleteRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faHandPointLeft,
  faMinusSquare,
  faPenToSquare,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import EditRole from "./EditRole";
import { fetchTree, updateTree } from "./features/TreeSlice";
import { useDispatch, useSelector } from "react-redux";
// import _ from 'lodash';
import _ from "lodash";
import NavBar from "./Components/NavBar";

function AddRole() {
  const dispatch = useDispatch();
  const { Tree, isLoading } = useSelector((state) => state.Tree);
  // const TempTree = {};

  // const [Tree, setTree] = useState();
  // const [Tree2, setTree2] = useState<t>();
  const [TempTree, setTempTree] = useState<t>();
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState(false);
  const [chosenNode, setChosenNode] = useState<t>();
  const [nodeParent, setNodeParent] = useState<t>();
  const [chosenIndex, setChosenIndex] = useState();
  const [updated, setUpdated] = useState();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editNode, setEditNode] = useState();
  const [nodeChildren, setNodeChildren] = useState<t>();
  const [search, setSearch] = useState("");
  const [renderedTree, setRenderedTree] = useState(false);
  const [desc, setDesc] = useState("");
  const [topNode, setTopNode] = useState<t>();
  const [topNodeParent, setTopNodeParent] = useState<t>();
  const [allCollapse, setAllCollapse] = useState(true);
  

  const SearchRef = useRef();
  interface t {
    value: string;
    id: number;
    description: string;
    children: t[];
  }


  useEffect(() => {
    // dispatch(setLoading(true))
    dispatch(fetchTree());
  }, []);

  useEffect(() => {
    setLoading(isLoading);
    if (isLoading == false) {
      setTempTree(_.cloneDeep(Tree));
    }
  }, [isLoading]);

  // console.log("node::", Object.isExtensible(TempTree?.children[0]));
  // useEffect(() => {
  //   (async () => {
  //     const Ans = await axios.get(
  //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getTree"
  //     );
  //     const Allroles = Ans.data.data;
  //     setTree(Allroles);
  //     setTree2(Allroles);
  //     setLoading(false);
  //     console.log("tree>>>", Tree);
  //   })();
  // }, [updated]);

  const folded = (node: t) => {
    if (search != "") {
      if (!node.value.includes(search)) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  const tt = (node) => {
    if (search != "") {
      if (!node.value.includes(search)) {
        return true;
      }
      return false;
    }
  };

  const ChildNode = ({ child, prefix, childNum, childLength, node }) => {
    const [close, setClose] = useState(true);
    const [hover, setHover] = useState();

    let childPrefix: string = "";
    if (childNum) {
      if (childNum > 1) {
        childPrefix = prefix + "  |   ";
      } else {
        childPrefix = prefix + "      ";
      }
    }
    return isRender(
      child,
      false,
      childPrefix,
      childLength,
      node,
      close,
      setClose,
      hover,
      setHover,
      num
    );
  };

  let num = 0;
  const [Hover, setHover] = useState(true);

  function deleteNodeTop() {
    const ans = confirm("Do you want to delete " + node.value);
    if (ans) {
      const number = topNodeParent?.children.indexOf(topNode);
      const children: t[] = topNode?.children;
      topNodeParent?.children.splice(number, 1);
      topNodeParent?.children.push(...children);

      dispatch(updateTree(TempTree))
        .then(() => {
          dispatch(fetchTree());
        })
        .catch((err) => {
          console.log("error while updating the tree : AddRoleForm: ", err);
        });
    }
  }

  let topArray = useMemo(() => [], [search]);
  const [arrayStart, setArrayStart] = useState(false);

  useEffect(() => {
    if (search == "") {
      setArrayStart(false);
    }
  }, [search]);

  const InputElement = useMemo(() => {
    return (
      <Input
        placeholder={"Search"}
        className="w-[500px] mb-5"
        // value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log("enter clicked");
            setArrayStart(true);
          }
        }}
      />
    );
  }, []);

  const SearchArray = useMemo(() => {
    return function searchGen(el) {
      return (
        <div className="mb-3">
          <div className={"inline hover:cursor-default text-gray-700"}>
            <NavLink
              to={`/employee/${el[0].id}/${el[0].value}`}
              className="hover:text-gray-900 hover:pl-2 transition-all transition-duration-200ms"
            >
              {"  "}
              {el[0].value}
            </NavLink>
            {` `}
            <div className={"opacity-100 ml-3 inline"}>
              <span
                className="hover:cursor-pointer font-bold text-black rounded-full border-1 border-gray-400"
                onClick={() => {
                  setChosen(true);
                  setShowDelete(false);
                  setShowEdit(false);
                  setChosenNode(el[0]);
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} />
              </span>{" "}
              <span
                className="hover:cursor-pointer  text-black font-bold pl-3 rounded-full border-1 border-gray-400"
                onClick={() => {
                  // setShowDelete(true);
                  // setShowEdit(false);
                  // setChosen(false);
                  // setNodeChildren(node);
                  deleteNodeTop();
                }}
              >
                <FontAwesomeIcon icon={faMinusSquare} />
              </span>
              <span
                className="hover:cursor-pointer  text-black font-bold pl-5 rounded-full border-1 border-gray-400"
                onClick={() => {
                  setShowEdit(true);
                  setShowDelete(false);
                  setChosen(false);
                  setEditNode(el[0]);
                  setNodeParent(el[1]);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
            </div>
          </div>
        </div>
      );
    };
  }, [arrayStart]);


  const isRender = useMemo(() => {
    return function dfs(
      node: t,
      isRoot = true,
      prefix = "",
      childNum?: number,
      parent: t,
      closeBtn = true,
      toggle: CallableFunction,
      hover: boolean,
      hoverSet: CallableFunction,
      number: number = 0
    ) {
      function deleteNode() {
        const ans = confirm("Do you want to delete " + node.value);
        if (ans) {
          const number = parent.children.indexOf(node);
          const children: t[] = node.children;
          parent.children.splice(number, 1);
          parent.children.push(...children);

          dispatch(updateTree(TempTree))
            .then(() => {
              dispatch(fetchTree());
            })
            .catch((err) => {
              console.log("error while updating the tree : AddRoleForm: ", err);
            });
        }
      }

      // Search functionality
      if (!isRoot) {
        if (arrayStart && node.value.includes(search)) {
          setTopNode(node);
          setTopNodeParent(parent);
          topArray.push([node, parent]);
          console.log("topArray: ", topArray);
        }
        if (search == "") {
          topArray.splice(0, topArray.length);
        }
      }
      // end

      const children = node.children.map((child, i) => {
        const childLength = node.children.length;

        return (
          <ChildNode
            key={i}
            child={child}
            prefix={prefix}
            childNum={childNum}
            childLength={childLength}
            node={node}
          />
        );
      });

      return (
        <div key={node.value} className="w-full">
          {isRoot && (
            <div
              className={
                search == ""
                  ? "inline hover:cursor-default text-gray-700"
                  : tt(node)
                  ? "inline hover:cursor-default text-gray-700"
                  : "inline hover:cursor-default text-gray-700 bg-red-300"
              }
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <NavLink
                to={`/employee/${node.id}/${node.value}`}
                className="hover:text-gray-900 hover:pl-1 transition-all transition-duration-200ms"
              >
                {"  "}
                {node.value}
              </NavLink>
              <div
                // className={`inline transition-all duration-300 ${
                //   Hover ? "opacity-100 ml-3" : "opacity-0 ml-[0]"
                // }`}
                className={`inline ml-3 transition-all opacity-25 hover:opacity-100`}
              >
                <span
                  className="hover:cursor-pointer font-bold text-black pl-3 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setChosen(true);
                    setShowDelete(false);
                    setShowEdit(false);
                    setChosenNode(node);
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>{" "}
                <span
                  className="hover:cursor-pointer  text-black font-bold pl-4 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setShowEdit(true);
                    setShowDelete(false);
                    setChosen(false);
                    setEditNode(node);
                    setNodeParent(parent);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                {/* <FontAwesomeIcon
              icon={faCircleDown}
              className="pl-5 opacity-50"
              onClick={() => toggle((state) => !state)}
            /> */}
              </div>
            </div>
          )}
          <span className="text-gray-600">{!isRoot && prefix + "  └──"}</span>
          {!isRoot && (
            <div
              className={
                search == ""
                  ? "inline hover:cursor-default text-gray-700"
                  : tt(node)
                  ? "inline hover:cursor-default text-gray-700"
                  : "inline hover:cursor-default text-gray-700 bg-red-300"
              }
              onMouseEnter={() => {
                setDesc(node.description);
                hoverSet(true);
              }}
              onMouseLeave={() => {
                hoverSet(false);
              }}
            >
              {node.children.length != 0 && (
                <ChevronIcon
                  className={
                    closeBtn == true
                      ? "inline mr-2 ml-2"
                      : "inline mr-2 ml-2 rotate-180"
                  }
                  onClick={() => toggle((state) => !state)}
                />
              )}
              <NavLink
                to={`/employee/${node.id}/${node.value}`}
                className="hover:text-gray-900 hover:pl-2 transition-all transition-duration-200ms"
              >
                {"  "}
                {node.value}
              </NavLink>
              {` `}
              <div
                className={`inline transition-all duration-300 ${
                  hover ? "opacity-100 ml-3" : "opacity-0 ml-[0]"
                }`}
              >
                <span
                  className="hover:cursor-pointer font-bold text-black rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setChosen(true);
                    setShowDelete(false);
                    setShowEdit(false);
                    setChosenNode(node);
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>{" "}
                {/* {node.children.length > 0 && ( */}
                <span
                  className="hover:cursor-pointer  text-black font-bold pl-3 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    // setShowDelete(true);
                    // setShowEdit(false);
                    // setChosen(false);
                    // setNodeChildren(node);
                    deleteNode();
                  }}
                >
                  <FontAwesomeIcon icon={faMinusSquare} />
                </span>
                {/* )} */}
                <span
                  className="hover:cursor-pointer  text-black font-bold pl-5 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setShowEdit(true);
                    setShowDelete(false);
                    setChosen(false);
                    setEditNode(node);
                    setNodeParent(parent);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
              </div>
              {/* <FontAwesomeIcon
              size={"2xs"}
              icon={faCircleDown}
              className="pl-5 opacity-50"
              onClick={() => toggle((state) => !state)}
            /> */}
            </div>
          )}
          <Collapse in={folded(node)}>
            <Collapse in={closeBtn}>
              <pre>{children}</pre>
            </Collapse>
          </Collapse>
        </div>
      );
    };
  }, [TempTree, search, arrayStart, allCollapse]);

  
  if (loading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="h-full flex z-1 ">
        <div className="min-h-[100vh] leading-[30px] flex-1 pl-5 text-gray-700 tracking-wide text-md flex  pt-5">
          <div className="pl-[5%] pt-[2%]">
            {InputElement}
            {arrayStart && (
              <div className=" border border-gray-300 px-5 flex flex-col">
                <p
                  className="text-xl place-self-end ml-3 hover:cursor-pointer"
                  onClick={() => setSearch("")}
                >
                  x
                </p>
                {topArray.map((el) => SearchArray(el))}
              </div>
            )}
            {/* <input
              type="checkbox"
              checked={allCollapse}
              onChange={(e) => setAllCollapse(e.target.checked)}
            /> */}
            {isRender(TempTree)}
          </div>
        </div>
        <div
          className="flex-1 flex flex-col justify-center items-center border-l"
          onMouseEnter={() => setDesc("")}
        >
          {!chosen && !showDelete && !showEdit && (
            <>
              <p className="text-gray-600 text-sm opacity-50">
                <pre>
                  Press the '+' icon to add a new role <br />
                  Press the '-' icon to remove a child
                </pre>
              </p>
              <div className="w-[80%] h-[20px] flex text-center pt-6 opacity-75 justify-center">
                {desc != "" && desc}
              </div>
            </>
          )}
          {chosen && (
            <p className="text-gray-400 text-sm">
              Add a role under {chosenNode?.value}
            </p>
          )}
          {chosen && (
            <AddRoleForm
              node={chosenNode}
              chosen={setChosen}
              tree={TempTree}
              updated={setUpdated}
            />
          )}
          {showDelete && (
            <DeleteRole
              showDelete={setShowDelete}
              children={nodeChildren}
              tree={TempTree}
              updated={setUpdated}
            />
          )}
          {showEdit && (
            <EditRole
              node={editNode}
              update={setShowEdit}
              tree={TempTree}
              rerenderTree={setUpdated}
              parent={nodeParent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddRole;
