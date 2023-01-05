import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import { useState } from "react"
import Modal from "./utils/Modal"
import FormAdd from "./FormAdd"

const Header = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.user)
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const roles = userData.roles

  const handleLogoutClick = () => {
    localStorage.removeItem("token")
    dispatch(logout())
    toast.info("Вы вышли из профиля")
  }

  return (
    <>
      {modalOpen &&
        <Modal setActive={setModalOpen} form={<FormAdd setActive={setModalOpen} />} />
      }
      <header className="flex items-center pt-[60px] mb-[20px] pb-[20px] border-b">
        <h1 className="mr-auto text-[22px] color-main-dark font-bold">{!isLoggedIn ? "Task Manager" : `${userData.userName}`}</h1>
        {isLoggedIn && roles.includes("admin") ?
          <ul className="flex justify-end mx-[-3px]">
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] flex justify-center items-center">
              <button className="w-full h-full text-[22px] text-gray fa-solid fa-arrow-right-from-bracket" onClick={handleLogoutClick}></button>
            </li>
          </ul>
          : null}
        {isLoggedIn && !roles.includes("admin") ?
          <ul className="flex justify-end mx-[-3px]">
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full bg-main-blue border border-main-blue"></li>
            <li className="w-[22px] h-[22px] mx-[3px] rounded-full border border-2 border-gray flex justify-center items-center">
              <button className="w-full h-full text-[16px] text-gray fa-solid fa-plus" onClick={() => setModalOpen(true)}></button>
            </li>
            <li className="w-[22px] h-[22px] mx-[3px] flex justify-center items-center">
              <button className="w-full h-full text-[22px] text-gray fa-solid fa-arrow-right-from-bracket" onClick={handleLogoutClick}></button>
            </li>
          </ul>
          : null}
      </header>
    </>
  )
}

export default Header