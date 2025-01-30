import React, { useEffect, useState, useTransition } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar.jsx";
import { ChangePassword, DeleteUser, UpdateUserByUserid } from "../services/api.user.js";
import toast from "react-hot-toast";
import { FaPowerOff, FaEdit, FaTrashAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.png";

function Navbar({ userDetails }) {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenpass, setIsOpenpass] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profilecolor, setProfilecolor] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setFirstname(userDetails?.firstname);
      setLastname(userDetails?.lastname);
      setProfilecolor(userDetails?.profilecolor);
    }
  }, [userDetails]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    sessionStorage.clear();
    startTransition(() => navigate("/login"));
  };

  const handleConfirm = () => {
    UpdateUserByUserid(sessionStorage.getItem("userid"), { firstname, lastname, profilecolor }).then((res) => {
      if (res.status) {
        toast.success("Successfully updated");
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  const ChangePasswordComp = () => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [showPassword, setShowpassword] = useState(false);

    const handleConfirmPassword = () => {
      const reqbody = {
        oldpassword,
        newpassword,
      };
      ChangePassword(sessionStorage.getItem("userid"), reqbody).then((res) => {
        if (res.status) {
          toast.success("New password is updated!");
          setIsOpenpass(false);
        } else {
          toast.error(res.message);
        }
      });
    };

    return (
      <>
        <Dialog
          open={isOpenpass}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setIsOpenpass(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl border-gray-500 border bg-[#2a2a2a] text-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle as="h3" className="font-medium text-lg ">
                  Change Password
                </DialogTitle>
                <div className="my-2 mt-5">
                  <div className="flex items-center text-sm  mb-2">
                    <FaLock className="mr-2" />
                    Old Password
                  </div>
                  <input
                    type="password"
                    className="bg-gray-700 mb-2 w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-0"
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                </div>
                <div className="my-2 mt-5">
                  <div className="flex items-center text-sm mb-2 ">
                    <FaLock className="mr-2" />
                    New Password
                  </div>
                  <div className="mb-2 w-full px-4 py-2 bg-gray-700 rounded-xl flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className=" bg-transparent text-sm w-full focus:outline-none focus:ring-0"
                      onChange={(e) => setNewpassword(e.target.value)}
                    />
                    <div onClick={() => setShowpassword(!showPassword)} className="cursor-pointer text-gray-400">
                      {showPassword ? (
                        <AiFillEyeInvisible className="mr-2 w-5 h-5" />
                      ) : (
                        <AiFillEye className="mr-2 w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-5">
                  <Button
                    className="inline-flex mx-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none "
                    onClick={() => setIsOpenpass(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-[#586ca8] py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none "
                    onClick={handleConfirmPassword}
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

  const handleDeleteProfile = async () => {
    const res = await DeleteUser(sessionStorage.getItem("userid"));
    if (res.status) {
      toast.success("Your profile has been removed");
      handleLogout();
    } else {
      toast.error(res.message);
    }
    setIsDeleteOpen(false);
  };

  return (
    <div className="w-full h-16  flex flex-1 justify-between bg-[#586ca8] items-center fixed top-0 z-50">
      <div className="text-white font-semibold text-lg ml-5 flex items-center gap-4">
        <div className="w-12 h-12 ">
          <img src={logo} className="rounded-md" alt="logo" />
        </div>
        {userDetails?.orgname?.toUpperCase()} WORKSPACE
      </div>
      <div className="flex justify-center items-center mx-5">
        <Menu>
          <MenuButton>
            <Avatar firstname={userDetails?.firstname} color={userDetails?.profilecolor} />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border-gray-500 border  shadow bg-[#2a2a2a] text-gray-200 p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50 "
          >
            <MenuItem>
              <button onClick={() => open()} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  ">
                <FaEdit className="h-5 w-5 " /> Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setIsOpenpass(true)}
                className=" group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  "
              >
                <FaLock className="h-5 w-5" /> Change Password
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => handleLogout()}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  "
              >
                <FaPowerOff className="h-5 w-5" /> Logout
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="text-red-500 group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  "
              >
                <FaTrashAlt className="h-5 w-5" /> Delete Profile
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm bg-gray-800 p-5 rounded-lg shadow-lg text-gray-200">
            <DialogTitle className="text-lg font-medium">Are you sure?</DialogTitle>
            <p className="text-sm text-gray-400 mt-2">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-1.5 bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button onClick={handleDeleteProfile} className="px-4 py-1.5 bg-red-600 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border-gray-500 border bg-[#2a2a2a] text-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="font-medium text-lg">
                Update your details
              </DialogTitle>
              <div className="flex flex-1 justify-center mt-5">
                <Avatar big={true} firstname={firstname} color={profilecolor} />
              </div>
              <div className="flex gap-2 justify-center mt-5">
                {["#2985ed", "#A592E6", "#F5A9E1", "#FC85C5", "#E09F7A", "#A8CBA0", "#A2DBD1", "#A1C8DB"].map(
                  (color) => (
                    <div
                      key={color}
                      onClick={() => setProfilecolor(color)}
                      className={`w-5 h-5 cursor-pointer rounded-full`}
                      style={{ backgroundColor: color, border: profilecolor === color ? "1px solid gray" : "none" }}
                    ></div>
                  )
                )}
              </div>
              <div className="my-2 mt-5">
                <div className="flex items-center text-sm mb-2 ">First Name</div>
                <input
                  className="bg-gray-700 mb-2 w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-0  "
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="my-2 mt-5">
                <div className="flex items-center text-sm mb-2 ">Last Name</div>
                <input
                  className="bg-gray-700 mb-2 w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-0 "
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end gap-5">
                <Button
                  className="inline-flex mx-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none "
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-[#586ca8] py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none "
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ChangePasswordComp />
    </div>
  );
}

export default Navbar;
