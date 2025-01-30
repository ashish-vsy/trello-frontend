import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Column from "./Column.jsx";
import BurnBarrel from "./BurnBarrel.jsx";
import { FaSearch } from "react-icons/fa";
import { getAllTasks } from "../services/api.task.js";
import { getAllUsers } from "../services/api.user.js";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("none");
  const [userslist, setUserslist] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    getAllTasks().then((res) => {
      if (res.status) {
        setCards(res.data);
        setAllTasks(res.data);
      } else {
        setCards([]);
        setAllTasks([]);
      }
    });
  }, [fetch]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.status) {
        setUserslist(res.data);
      } else {
        setUserslist([]);
      }
    });
  }, []);

  useEffect(() => {
    let filteredTasks = allTasks;

    if (searchTerm.trim()) {
      filteredTasks = filteredTasks.filter(
        (task) => task.taskname && task.taskname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

  if (filter !== "none") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority && task.priority.toLowerCase() === filter.toLowerCase()
      );
    }

    setCards(filteredTasks);
  }, [searchTerm, filter, allTasks]);

  return (
    <motion.div className="flex flex-col h-full w-full justify-start overflow-auto bg-[#2a2a2a] text-whitw">
      <div className="mt-20 flex justify-between px-6">
        <div className="flex flex-1 gap-3">
          <div className="w-1/3 px-4 py-2 bg-gray-700 rounded-full flex items-center transition">
            <FaSearch className="text-gray-200 w-5 h-5" />
            <input
              className="text-gray-200 ml-5 text-sm w-full bg-gray-700 text focus:outline-none"
              placeholder="Search for task name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg transition">
          <label className="text-sm text-gray-200 whitespace-nowrap">Filter By</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-600 py-2 px-3 text-sm  focus:outline-none transition-all duration-200"
          >
            <option value="none">None</option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>
      </div>

      <div className="flex h-full w-full gap-5 m-12">
        <Column title="Backlog" column="not started" headingColor="text-gray-500" cards={cards} setCards={setCards} userslist={userslist} setFetch={setFetch} />
        <Column title="In progress" column="pending" headingColor="text-blue-500" cards={cards} setCards={setCards} userslist={userslist} setFetch={setFetch} />
        <Column title="Complete" column="completed" headingColor="text-green-500" cards={cards} setCards={setCards} userslist={userslist} setFetch={setFetch} />
        <BurnBarrel setFetch={setFetch} />
      </div>
    </motion.div>
  );
};

export default Board;
