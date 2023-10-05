import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchTree, updateTree } from "./features/TreeSlice";
import { Select } from "@mantine/core";

interface t {
  value: string;
  id: number;
  description: string;
  children: t[];
}

interface o {
  node: t;
  update: CallableFunction;
  tree: t;
  rerenderTree: CallableFunction;
  parent: t | undefined;
}

function EditRole({ node, update, tree, rerenderTree, parent }: o) {
  const [name, setName] = useState<string>(node.value);
  const [role, setRole] = useState("none");
  const [chesedNode, setChosenNode] = useState<t>();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Chosen > > > ", chesedNode);
  }, [chesedNode]);

  const dropDownGenerator = (dropTree: t) => {
    let ans = [];
    // if (dropTree.children.indexOf(node)) {
    //   console.log(dropTree.value, node.value, dropTree.children.indexOf(node));
    // }
    if (dropTree.id == node.id) {
      console.log(">>>>", dropTree.value);
    }
    if (dropTree.id) {
      dropTree.children.forEach((el) => {
        if (dropTree.id != node.id) {
          ans = [...ans, ...dropDownGenerator(el)];
        }
      });
      if (dropTree.id != node.id) {
        // ans.push(<option value={dropTree.id}>{dropTree.value}</option>);
        ans.push({ value: dropTree.id, label: dropTree.value });
      }
      return ans;
    }
  };

  const findNode = (tree: t, id: number, add: t) => {
    if (tree.id == id) {
      tree.children.push(add);
      return;
    } else {
      tree.children.forEach((el) => {
        findNode(el, id, add);
      });
    }
  };

  const rename = (noder, name) => {
    if (noder.id == node.id) {
      noder.value = name;
      return;
    }
    tree.children.forEach((el) => {
      rename(el, name);
    });
  }

  const formSubmit = (data) => {
    if (data.role) {
      const index: number = parent?.children.indexOf(node);
      console.log(index);
      findNode(tree, data.role, node);
      parent?.children.splice(index, 1);
    }
    rename(node, data.name)

    //
    // (async () => {
    //   try {
    //     const responce = axios.post(
    //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeTree",
    //       tree
    //     );
    //     console.log("tree updated!");
    //     const responce2 = axios.post(
    //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeRoles",
    //       tree
    //     );
    //     rerenderTree((state) => !state);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    //

    dispatch(updateTree(tree))
      .then(() => {
        dispatch(fetchTree());
      })
      .catch((err) => {
        console.log("error while updating the tree : AddRoleForm: ", err);
      });

    // setName("");
  };
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="flex flex-col gap-10 w-[70%]"
      onSubmit={handleSubmit(formSubmit)}
    >
      <label
        className="tracking-wide text-xs font-bold mb-2"
        htmlFor="grid-state"
      >
        Editing{" "}
        <span className="uppercase px-1 underline">' {node.value} '</span> to...
      </label>
      <input
        {...register("name")}
        className=" bg-white border border-1 border-gray-300
          shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={node.value}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="relative">
        {/* <select
          {...register("role", {
            required: true,
          })}
          aria-invalid={errors.role ? "true" : "false"}
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="none" selected>
            --Select--
          </option>
          {dropDownGenerator(tree)}
        </select> */}
        <Controller
          name="role"
          control={control}
          // rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              label="Move role to a new position"
              placeholder="pick one"
              searchable
              clearable
              data={dropDownGenerator(tree)}
            />
          )}
        />
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div> */}
      </div>
      <div className="flex gap-3 p-3">
        <button
          className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Edit
        </button>
        <button
          className="bg-red-500 flex-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            update(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditRole;
