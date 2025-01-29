import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator.jsx";
import Avatar from "./Avatar.jsx";
import { Button, Dialog, DialogPanel, DialogTitle, Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { UpdateTasksbyTaskid, AssignTask, getAssignedUsersByTaskId } from "../services/api.task.js";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { FaClock } from "react-icons/fa";
import Multiselect from "multiselect-react-dropdown";

const Card = ({ title, id, column, handleDragStart, taskdetails, setFetch, userslist }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState(["high", "medium", "low"]);
  const [createdby, setCreatedby] = useState("");
  const [profileColor, setProfileColor] = useState("");

  useEffect(() => {
    if (taskdetails) {
      console.log(taskdetails, "taskdetails");
      setTaskname(title);
      setTaskdescription(taskdetails.taskdescription);
      setDuedate(taskdetails.duedate);
      setPriority(taskdetails.priority);
      setCreatedby(taskdetails.firstname);
      setProfileColor(taskdetails.profilecolor);
    }
  }, [taskdetails]);

  useEffect(() => {
    getAssignedUsersByTaskId(id).then((res) => {
      if (res.status) {
        const new_data = res.data.map((user) => {
          return {
            id: user.id,
            name: `${user.firstname} ${user.lastname}`,
          };
        });
        setSelectedPeople(new_data);
      } else {
        setSelectedPeople([]);
      }
    });
  }, [id]);

  const people = userslist.map((user) => {
    return {
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
    };
  });
  const [selectedPeople, setSelectedPeople] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedPeople(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedPeople(selectedList);
  };
  const handleConfirm = async () => {
    try {
      const reqbody = {
        taskname,
        taskdescription,
        duedate,
        priority,
      };

      const res1 = await UpdateTasksbyTaskid(id, reqbody);
      if (res1.status) {
        toast.success("Task updated successfully!");
        setIsOpen(false);
      } else {
        toast.error(res1.message);
      }

      const assignUsersReqbody = {
        userid: selectedPeople,
        taskid: id,
      };

      const res2 = await AssignTask(assignUsersReqbody);
      if (res2.status) {
        toast.success("Assigned Task!");
      } else {
        toast.error(res2.message);
      }
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleAssigne = (value) => {
    AssignTask(id, { userid: value }).then((res) => {
      if (res.status) {
        toast.success("Assigned Task!");
        setFetch((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    });
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const getColor = (val) => {
    if (val === "bug") {
      return "#dc2626";
    } else if (val === "feature") {
      return "#22c55e";
    } else if (val === "tobediscussed") {
      return "#a855f7";
    } else if (val === "notpriority") {
      return "#3b82f6";
    }
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-pointer rounded bg-white text-black p-3 border active:cursor-grabbing"
        onClick={open}
      >
        {taskdetails.priority?.[0] ? (
          <div
            target={taskdetails.priority?.[0] ?? ""}
            style={{ backgroundColor: getColor(taskdetails.priority?.[0] ?? "") }}
            className="w-12 h-2 rounded-full my-2"
          ></div>
        ) : (
          ""
        )}
        <p className="text-md ">{title}</p>
        {duedate ? (
          <div className="flex gap-2 text-sm mt-2 items-center">
            <FaClock className="size-4" />
            {dayjs(duedate).format("DD MMM YYYY HH:mm")}
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-1 justify-end">
          <Avatar small={true} firstname={createdby} color={profileColor} />
        </div>
      </motion.div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border border-[#404040] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium  text-black">
                Edit Task
              </DialogTitle>
              <div className="my-2 mt-5">
                <div className="flex text-sm ">Task</div>
                <input
                  className=" mb-2 w-full px-4 py-2  rounded-xl text-md border focus:outline-none focus:ring-0"
                  value={taskname}
                  onChange={(e) => setTaskname(e.target.value)}
                ></input>
              </div>
              <div className="my-2">
                <div className="flex text-sm ">Task Description</div>
                <textarea
                  className="mb-2 w-full px-4 py-2  rounded-xl border text-md focus:outline-none focus:ring-0"
                  value={taskdescription}
                  onChange={(e) => setTaskdescription(e.target.value)}
                ></textarea>
              </div>
              <div className="my-2">
                <div className="flex text-sm ">Due Date</div>
                <input
                  type="datetime-local"
                  className=" mb-2 w-full px-4 py-2  rounded-xl border text-md focus:outline-none focus:ring-0"
                  value={duedate}
                  onChange={(e) => setDuedate(e.target.value)}
                ></input>
              </div>
              <div className="my-2">
                <Field>
                  <div className="flex gap-3 text-sm  items-center">
                    Priority
                    <div
                      target={priority ?? ""}
                      style={{ backgroundColor: getColor(priority ?? "") }}
                      className="w-10 h-2 rounded-full"
                    ></div>
                  </div>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={clsx(
                      "block w-full appearance-none rounded-lg border  py-1.5 px-3 text-sm/6 ",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                      "*:text-black"
                    )}
                  >
                    <option value="high">HIGH</option>
                    <option value="medium">MEDIUM</option>
                    <option value="low">LOW</option>
                  </Select>
                </Field>
              </div>
              <div className="my-2">
                <div>
                  <div className="flex gap-3 text-sm items-center">Assign To</div>
                  <Multiselect
                    options={people}
                    selectedValues={selectedPeople}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="name"
                  />
                </div>
              </div>
              <div className="my-4 flex gap-2 items-center ">
                Created By <Avatar small={true} firstname={createdby} color={profileColor} />
              </div>
              <div className="mt-4 flex justify-end flex-1 gap-5">
                <Button
                  className="inline-flex mx-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-pink-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-pink-400 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-pink-500"
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Card;
