import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Column from './Column';
import BurnBarrel from './BurnBarrel';
import { SearchTasks, GetAllUsersList } from '../Api';
import { Field, Select } from '@headlessui/react';
import clsx from 'clsx';

const Board = () => {
    const DEFAULT_CARDS = [
        // BACKLOG
        { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
        { title: "SOX compliance checklist", id: "2", column: "backlog" },
        { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
        { title: "Document Notifications service", id: "4", column: "backlog" },
        // TODO
        {
            title: "Research DB options for new microservice",
            id: "5",
            column: "todo",
        },
        { title: "Postmortem for outage", id: "6", column: "todo" },
        { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

        // DOING
        {
            title: "Refactor context providers to use Zustand",
            id: "8",
            column: "doing",
        },
        { title: "Add logging to daily CRON", id: "9", column: "doing" },
        // DONE
        {
            title: "Set up DD dashboards for Lambda listener",
            id: "10",
            column: "done",
        },
    ];

    const [cards, setCards] = useState(DEFAULT_CARDS);
    const [fetch, setFetch] = useState(false);
    const [searchterm, setSearchterm] = useState();
    const [filter, setFilter] = useState();
    const [userslist, setUserslist] = useState([]);

    useEffect(() => {
        SearchTasks().then((res) => {
            if (res.status) {
                setCards(res.data);
            } else {
                setCards([])
            }
        })
    }, [fetch]);

    useEffect(() => {
        GetAllUsersList().then((res) => {
            if (res.status) {
                setUserslist(res.data);
            } else {
                setUserslist([]);
            }
        })
    }, [])

    const handleSearch = () => {
        const val = 'term=' + searchterm;
        SearchTasks(val).then((res) => {
            if (res.status) {
                setCards(res.data);
            } else {
                setCards([])
            }
        })
    }

    const handleFilter = (value) => {
        setFilter(value)

        if (value == 'none') {
            SearchTasks().then((res) => {
                if (res.status) {
                    setCards(res.data);
                } else {
                    setCards([])
                }
            })
        } else if (value === 'taskassignedtome') {
            const val = 'assignedto=' + sessionStorage.getItem('userid');
            SearchTasks(val).then((res) => {
                if (res.status) {
                    setCards(res.data);
                } else {
                    setCards([])
                }
            })
        } else {
            const val = 'tags=' + value;
            SearchTasks(val).then((res) => {
                if (res.status) {
                    setCards(res.data);
                } else {
                    setCards([])
                }
            })
        }
    }

    return (
        <div className="flex flex-col h-full w-full justify-center overflow-scroll">
            <div className="mt-5 flex justify-between">
                <div className="flex flex-1 gap-3 mx-4">
                    <div className='w-1/3 px-4 py-2 bg-neutral-800 rounded-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input onBlur={() => handleSearch()} className="text-gray-300 ml-5 text-sm w-full bg-neutral-800 focus:outline-none focus:ring-0" placeholder="Search for task name" onChange={(e) => setSearchterm(e.target.value)} ></input>
                    </div>
                    <button onClick={() => handleSearch()} className="py-1 px-5 bg-violet-500 text-white rounded-full active:bg-blue-600">Search</button>
                </div>
                <Field className='flex flex-3 mx-3'>
                    <div className='text-sm text-gray-400 items-center'>
                        Filter By
                    </div>
                    <Select value={filter} onChange={(e) => { handleFilter(e.target.value) }}
                        className={clsx(
                            'block w-full appearance-none rounded-full border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            // Make the text of each option black on Windows
                            '*:text-black'
                        )}
                    >
                        <option value="none">None</option>
                        <option value="taskassignedtome">Task assigned to me</option>
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                        <option value="tobediscussed">To Be Discussed</option>
                        <option value="notpriority">Not Priority</option>
                    </Select>
                </Field>
            </div>
            <div className="flex h-full w-full gap-5 m-12">
                <Column
                    title="Backlog"
                    column="backlog"
                    headingColor="text-neutral-500"
                    cards={cards}
                    setCards={setCards}
                    setFetch={setFetch}
                    userslist={userslist}
                />
                <Column
                    title="TODO"
                    column="todo"
                    headingColor="text-yellow-200"
                    cards={cards}
                    setCards={setCards}
                    setFetch={setFetch}
                    userslist={userslist}
                />
                <Column
                    title="In progress"
                    column="doing"
                    headingColor="text-blue-300"
                    cards={cards}
                    setCards={setCards}
                    setFetch={setFetch}
                    userslist={userslist}
                />
                <Column
                    title="Complete"
                    column="done"
                    headingColor="text-emerald-200"
                    cards={cards}
                    setCards={setCards}
                    setFetch={setFetch}
                    userslist={userslist}
                />
                <BurnBarrel setCards={setCards} setFetch={setFetch} />
            </div>
        </div>
    );

};

export default Board;