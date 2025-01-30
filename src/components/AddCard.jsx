import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CreateTask } from "../services/api.task.js";
import { FaTimes, FaPlus } from "react-icons/fa";

const AddCard = ({ column, setFetch }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) {
      toast.error("Add task name.");
      return;
    }

    const newCard = {
      status: column,
      taskname: text.trim(),
      orgid: sessionStorage.getItem("orgid"),
      userid: sessionStorage.getItem("userid"),
      priority: "high",
      duedate: new Date(new Date().setDate(new Date().getDate() + 7)),
    };

  
    CreateTask(newCard).then((res) => {
      if (res.status) {
        setFetch((prev) => !prev);
        toast.success("Added successfully!");
      } else {
        toast.error(res.message);
      }
    })
    setAdding(false);

  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            value={text} 
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-gray-400 bg-blue-200/20 p-3 text-sm text-neutral-200 placeholder-[#6778ac] focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="button" 
              onClick={() => setAdding(false)}
              className="flex items-center gap-2  rounded  px-3 py-1.5 text-xs bg-neutral-700 transition-colors hover:bg-neutral-600"
            >
              <span>Close</span>
              <FaTimes className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded  px-3 py-1.5 text-xs bg-neutral-500 transition-colors hover:bg-neutral-600"
            >
              <span>Add</span>
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-500"
        >
          <span>Add card</span>
          <FaPlus className="h-4 w-4" />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
