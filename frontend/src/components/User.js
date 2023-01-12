import Modal from "./utils/Modal"
import FormUser from "./FormUser"
import { api } from "../services/ApiService"
import { toast } from "react-toastify"
import { useState } from "react"
import { useSelector } from "react-redux"

const User = ({ id, name, email, hasRoles, roles }) => {
  const { userData } = useSelector((state) => state.user)
  const [modalOpen, setModalOpen] = useState({
    modalEdit: false,
    modalDelete: false,
  })

  const [deleteUser] = api.useDeleteUserMutation()

  const deleteTargetUser = () => {
    if (userData._id === id) {
      toast.error("Вы пытаетесь удалить свой профиль!")
      setModalOpen(false)
      return
    }
    deleteUser(id).unwrap()
      .then((payload) => toast.success(payload.message))
      .catch((error) => toast.error(error.data.message))
  }

  return (
    <>
      {modalOpen.modalEdit &&
        <Modal
          setActive={setModalOpen}
          form={<FormUser
            userName={name}
            userEmail={email}
            userId={id}
            hasRoles={hasRoles}
            roles={roles}
            setActive={setModalOpen}
          />}
        />
      }
      {modalOpen.modalDelete &&
        <Modal
          setActive={setModalOpen}
          form={
            <>
              <p className="my-4 font-semibold text-[18px]">Вы уверены, что хотите удалить пользователя?</p>
              <button
                className="block ml-auto py-[3px] px-[10px] rounded-[10px] border border-main-dark bg-neutral-100"
                onClick={() => deleteTargetUser()}>
                Удалить пользователя
              </button>
            </>
          }
        />
      }
      <li className="mb-[12px] p-[14px] bg-white rounded-[10px]">
        <div className="flex items-start mb-[15px]">
          <h2 className="mr-auto py-[3px] px-[10px] text-[16px] rounded-[10px] bg-sky-100 text-sky-600 font-bold">{name}</h2>
          <button
            className="py-[1px] px-[4px] text-[18px] text-gray fa-solid fa-pen-to-square"
            onClick={() => setModalOpen({
              ...modalOpen, modalEdit: true
            })}
          />
          <button
            className="py-[1px] px-[4px] text-[18px] text-gray fa-solid fa-trash-can"
            onClick={() => setModalOpen({
              ...modalOpen, modalDelete: true
            })}
          />
        </div>
        <div className="flex items-end">
          <div className="flex flex-col mr-auto text-[14px] font-normal">
            <div className="mb-[5px] text-[20px]">{email}</div>
            <div className="flex text-[18px]">
              <h2 className="font-bold">Роли:</h2>
              {hasRoles && hasRoles.map(hasRole => {
                const { value } = roles.find(el => el._id === hasRole)
                return <div key={hasRole} className="mx-[5px]">{value}</div>
              })}
            </div>
          </div>
          <div className="min-w-[22px] min-h-[22px] bg-main-blue rounded-full"></div>
        </div>
      </li>
    </>
  )
}

export default User