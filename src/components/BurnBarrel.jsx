import React, { useState } from "react";
import { motion } from "framer-motion";
import { DeleteTask } from "../services/api.task.js";
import toast from "react-hot-toast";
import { FaFire, FaTrash } from "react-icons/fa";

const BurnBarrel = ({ setCards, setFetch }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");
        DeleteTask(cardId).then((res) => {
            if (res.status) {
                toast.success("Deleted successfully!");
                setFetch((prev) => !prev);
            } else {
                toast.error(res.message);
            }
        });
        setActive(false);
    };

    return (
        <motion.div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded-md border border-1 text-3xl ${active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-blue-100  bg-white text-blue-200"
                }`}
        >
            {active ?
                <FaFire className="animate-bounce size-6" /> :
                <FaTrash className="size-6" />
            }
        </motion.div>
    );
};

export default BurnBarrel;
