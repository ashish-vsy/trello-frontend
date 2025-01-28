import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DropIndicator from './DropIndicator';
import Avatar from './Avatar';
import { Button, Dialog, DialogPanel, DialogTitle, Description, Field, Label, Select } from '@headlessui/react';
import clsx from 'clsx';
import { UpdateTasksbyTaskid, AssignTask } from "../Api";
import toast from "react-hot-toast";
import dayjs from 'dayjs';


const Card = ({ title, id, column, handleDragStart, taskdetails, setFetch, userslist }) => {
  let [isOpen, setIsOpen] = useState(false)
  const [taskname, setTaskname] = useState('');
  const [taskdescription, setTaskdescription] = useState('');
  const [duedate, setDuedate] = useState('');
  const [tags, setTags] = useState('');  

  useEffect(() => {
    if (taskdetails) {
      setTaskname(title);
      setTaskdescription(taskdetails.taskdescription);
      setDuedate(taskdetails.duedate);
      setTags(taskdetails.tags?.[0] ?? '')
    }
  }, [taskdetails]);

  

  const handleConfirm = () => {
    const reqbody = {
      taskname,
      taskdescription,
      duedate,
      tags: [tags]
    }
    UpdateTasksbyTaskid(id, reqbody).then((res) => {
      if (res.status) {
        toast.success("Task updated successfully!");
        setFetch((prev) => !prev);
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    })
  }
  
  const handleAssigne = (value) =>{
    AssignTask(id,{userid: value}).then((res) => {
      if(res.status){
        toast.success("Assigned Task!");
        setFetch((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    })
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const getColor = (val) => {
    if (val === 'bug') {
      return '#dc2626'
    } else if (val === 'feature') {
      return '#22c55e'
    } else if (val === 'tobediscussed') {
      return '#a855f7'
    } else if (val === 'notpriority') {
      return '#3b82f6'
    }
  }

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-pointer rounded bg-neutral-800 p-3 active:cursor-grabbing"
        onClick={open}
      >
        {taskdetails.tags?.[0] ? <div target={taskdetails.tags?.[0] ?? ''} style={{ backgroundColor: getColor(taskdetails.tags?.[0] ?? '') }} className="w-10 h-2 rounded-full my-2"></div> : ""}
        <p className="text-md text-neutral-100">{title}</p>
        {duedate ? <div className="flex gap-2 text-sm mt-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>{dayjs(duedate).format('DD MMM YYYY HH:mm')}
        </div> : <></>}
        <div className="flex flex-1 justify-end">
          <Avatar small={true} firstname={taskdetails.assigned_user?.firstname} color={taskdetails.assigned_user?.profilecolor} />
        </div>
      </motion.div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-lg text-violet-500">
                Edit Task
              </DialogTitle>
              <div className="my-2 mt-5">
                <div className='flex text-sm text-gray-400'>Task</div>
                <input className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" value={taskname} onChange={(e) => setTaskname(e.target.value)} ></input>
              </div>
              <div className="my-2">
                <div className='flex text-sm text-gray-400'>Task Description</div>
                <textarea className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" value={taskdescription} onChange={(e) => setTaskdescription(e.target.value)} ></textarea>
              </div>
              <div className="my-2">
                <div className='flex text-sm text-gray-400'>Due Date</div>
                <input type="datetime-local" className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" value={duedate} onChange={(e) => setDuedate(e.target.value)} ></input>
              </div>
              <div className="my-2">
                <Field>
                  <div className='flex gap-3 text-sm text-gray-400 items-center'>
                    Add Tag
                    <div target={tags ?? ''} style={{ backgroundColor: getColor(tags ?? '') }} className="w-10 h-2 rounded-full"></div>
                  </div>
                  <Select value={tags} onChange={(e) => setTags(e.target.value)}
                    className={clsx(
                      'block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                      // Make the text of each option black on Windows
                      '*:text-black'
                    )}
                  >
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="tobediscussed">To Be Discussed</option>
                    <option value="notpriority">Not Priority</option>
                  </Select>
                </Field>
              </div>
              <div className="my-2">
                <Field>
                  <div className='flex gap-3 text-sm text-gray-400 items-center'>
                    Assign To
                  </div>
                  <Select onChange={(e) => handleAssigne(e.target.value)}
                    className={clsx(
                      'block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                      // Make the text of each option black on Windows
                      '*:text-black'
                    )}
                  >
                    {userslist?.map((item) => <option value={item.userid}>{item.firstname}</option>)}
                  </Select>
                </Field>
              </div>
              <div className="my-4 flex gap-2 items-center text-gray-400">
                Assigned to <Avatar small={true} firstname={taskdetails.assigned_user?.firstname} color={taskdetails.assigned_user?.profilecolor} />
                <p>{taskdetails.assigned_user?.firstname}.</p>
              </div>
              <div className="my-4 flex gap-2 items-center text-gray-400">
                Created By <Avatar small={true} firstname={taskdetails.created_by?.firstname} color={taskdetails.created_by?.profilecolor} />
                <p>{taskdetails.created_by?.firstname}.</p>
              </div>
              <div className="mt-4 flex justify-end flex-1 gap-5">
                <Button
                  className="inline-flex mx-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-violet-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-violet-400 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-violet-500"
                  onClick={() => handleConfirm()} >
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