import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from './Card';
import AddCard from './AddCard';
import DropIndicator from './DropIndicator';
import { UpdateTasksbyTaskid } from "../Api";

function Column({ title, headingColor, cards, column, setCards, setFetch, userslist }) {

    const [active, setActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
        console.log(e.dataTransfer.getData("cardId"))
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((c) => c.taskid === cardId);

            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, listname: column };
            UpdateTasksbyTaskid(cardId, { listname: column }).then((res) => {
                if (res.status) {
                    setFetch((prev) => !prev);
                }
            })
            copy = copy.filter((c) => c.taskid !== cardId);
            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.taskid === before);
                if (insertAtIndex === -1) return;
                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.listname === column);

    return (
        <div className="w-[275px] shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium text-lg ${headingColor}`}>{title}<span className="text-sm"> ({filteredCards.length})</span></h3>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.taskid} userslist={userslist} id={c.taskid} title={c.taskname} taskdetails={c} handleDragStart={handleDragStart} setFetch={setFetch} />;
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} setCards={setCards} setFetch={setFetch} />
            </div>
        </div>
    );
};

export default Column;