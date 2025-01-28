import React, { useEffect, useState, useTransition } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Button, Dialog, DialogPanel, DialogTitle, Description, Field, Label, Select } from '@headlessui/react';
import { useNavigate } from "react-router-dom"
import Avatar from './Avatar.jsx';
import { ChangePassword, DeleteUser, UpdateUserByUserid } from '../services/api.user.js';
import toast from 'react-hot-toast';

function Header({ userDetails }) {

  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenpass, setIsOpenpass] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilecolor, setProfilecolor] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (userDetails) {
      setFirstname(userDetails?.firstname);
      setLastname(userDetails?.lastname);
      setProfilecolor(userDetails?.profilecolor);
    }
  }, [userDetails])

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    startTransition(() => navigate('/login'))
  }

  const handleConfirm = () => {
    UpdateUserByUserid(sessionStorage.getItem('userid'), { firstname, lastname, profilecolor }).then((res) => {
      if (res.status) {
        toast.success('Successfully updated');
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    })
  }

  const ChangePasswordComp = () => {

    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [showPassword, setShowpassword] = useState(false);

    const handleConfirmPassword = () => {
      const reqbody = {
        oldpassword, newpassword
      }
      ChangePassword(sessionStorage.getItem('userid'), reqbody).then((res) => {
        if (res.status) {
          toast.success("New password is updated!");
          setIsOpenpass(false);
        } else {
          toast.error(res.message);
        }
      })
    }

    return (
      <>
        <Dialog open={isOpenpass} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpenpass(false)}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle as="h3" className="text-base/7 font-medium text-lg text-violet-500">
                  Change Password
                </DialogTitle>
                <div className="my-2 mt-5">
                  <div className='flex text-sm text-gray-400'>Old Password</div>
                  <input type='password' className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" onChange={(e) => setOldpassword(e.target.value)} ></input>
                </div>
                <div className="my-2 mt-5">
                  <div className='flex text-sm text-gray-400'>New Password</div>
                  <div className='mb-2 w-full px-4 py-2 bg-white/5 rounded-xl flex'>
                    <input type={showPassword ? 'text' : 'password'} className="text-gray-300 bg-transparent text-sm w-full focus:outline-none focus:ring-0" onChange={(e) => setNewpassword(e.target.value)} ></input>
                    {
                      showPassword ?
                        <svg onClick={() => setShowpassword(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        : <svg onClick={() => setShowpassword(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                  </div>
                </div>
                <div className="mt-4 flex justify-end flex-1 gap-5">
                  <Button
                    className="inline-flex mx-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={() => setIsOpenpass(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-violet-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-violet-400 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-violet-500"
                    onClick={() => handleConfirmPassword()} >
                    Confirm
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    )
  }

  const handleDeleteProfile = () => {
    const confrim = window.confirm("Are you sure?");
    if (confrim) {
      DeleteUser(sessionStorage.getItem('userid')).then((res) => {
        if (res.status) {
          toast.success("Your profile has been removed");
          handleLogout();
        } else {
          toast.error(res.message);
        }
      })
    }
  }

  return (
    <div className='w-full h-16 bg-violet-500 flex flex-1 justify-between items-center'>
      <div className='text-white font-semibold text-lg ml-5'>Trello Clone</div>
      <div className='flex justify-center items-center mx-5'>
        <Menu>
          <MenuButton><Avatar firstname={userDetails?.firstname} color={userDetails?.profilecolor} /></MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-gray-200 shadow bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button onClick={() => open()} className="text-black group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg> Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => setIsOpenpass(true)} className="text-black group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg> Change Password
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => handleLogout()} className="text-black group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg> Logout
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => handleDeleteProfile()} className="text-red-500 group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg> Delete Profile
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-lg text-violet-500">
                Update your details
              </DialogTitle>
              <div className='flex flex-1 justify-center mt-5'>
                <Avatar big={true} firstname={firstname} color={profilecolor} />
              </div>
              <div className='flex gap-2 justify-center mt-5'>
                <div onClick={() => setProfilecolor('#c2410c')} className={`w-5 h-5 bg-[#c2410c] cursor-pointer rounded-full ${profilecolor === '#c2410c' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#3f6212')} className={`w-5 h-5 bg-[#3f6212] cursor-pointer rounded-full ${profilecolor === '#3f6212' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#065f46')} className={`w-5 h-5 bg-[#065f46] cursor-pointer rounded-full ${profilecolor === '#065f46' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#0c4a6e')} className={`w-5 h-5 bg-[#0c4a6e] cursor-pointer rounded-full ${profilecolor === '#0c4a6e' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#1e3a8a')} className={`w-5 h-5 bg-[#1e3a8a] cursor-pointer rounded-full ${profilecolor === '#1e3a8a' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#4c1d95')} className={`w-5 h-5 bg-[#4c1d95] cursor-pointer rounded-full ${profilecolor === '#4c1d95' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#831843')} className={`w-5 h-5 bg-[#831843] cursor-pointer rounded-full ${profilecolor === '#831843' ? 'border border-white' : ''}`}></div>
                <div onClick={() => setProfilecolor('#86198f')} className={`w-5 h-5 bg-[#86198f] cursor-pointer rounded-full ${profilecolor === '#86198f' ? 'border border-white' : ''}`}></div>
              </div>
              <div className="my-2 mt-5">
                <div className='flex text-sm text-gray-400'>Firstname</div>
                <input className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" value={firstname} onChange={(e) => setFirstname(e.target.value)} ></input>
              </div>
              <div className="my-2 mt-5">
                <div className='flex text-sm text-gray-400'>Lastname</div>
                <input className="text-gray-200 mb-2 w-full px-4 py-2 bg-white/5 rounded-xl text-md focus:outline-none focus:ring-0" value={lastname} onChange={(e) => setLastname(e.target.value)} ></input>
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
      <ChangePasswordComp />
    </div>
  )
}

export default Header;