import { useSelector } from "react-redux"
import Input from "./utils/Input"
import Modal from "./utils/Modal"
import FormEdit from "./FormEdit"
import { api } from "../services/ApiService"
import { toast } from "react-toastify"
import { useState } from "react"

const Task = ({ id, title, value, completeProgress, creationDate, expiredDate, targetStage, stages, users }) => {
  const { userData } = useSelector((state) => state.user)
  const [modalOpen, setModalOpen] = useState({
    modalEdit: false,
    modalDelete: false,
  })
  const roles = userData.roles

  const dateCreation = new Date(creationDate).toLocaleDateString('ru', { month: "long", day: "numeric" })
  const dateExpired = new Date(expiredDate).toLocaleDateString('ru', { month: "long", day: "numeric" })

  const [deleteTask] = api.useDeleteTaskMutation()

  const deleteTargetTask = () => {
    deleteTask(id).unwrap()
      .then((payload) => toast.success(payload.message))
      .catch((error) => toast.error(error.data.message))
  }

  return (
    <>
      {modalOpen.modalEdit &&
        <Modal
          setActive={setModalOpen}
          form={
            <FormEdit
              setActive={setModalOpen}
              title={title}
              value={value}
              completeProgress={completeProgress}
              expiredDate={expiredDate}
              taskId={id}
              targetStage={targetStage}
              stages={stages}
              users={users}
            />
          }
        />
      }
      {modalOpen.modalDelete &&
        <Modal
          setActive={setModalOpen}
          form={
            <>
              <p className="my-4 font-semibold text-[18px]">Вы уверены, что хотите удалить задачу?</p>
              <button
                className="block ml-auto py-[3px] px-[10px] rounded-[10px] border border-main-dark bg-neutral-100"
                onClick={() => deleteTargetTask()}>
                Удалить задачу
              </button>
            </>
          }
        />
      }
      <li className="mb-[12px] p-[14px] bg-white rounded-[10px]">
        <div className="flex items-start mb-[20px]">
          <h2 className="mr-auto py-[3px] px-[10px] text-[14px] rounded-[10px] bg-sky-100 text-sky-600 font-bold">{title}</h2>
          <button
            className="py-[1px] px-[4px] text-[18px] text-gray fa-solid fa-pen-to-square"
            onClick={() => setModalOpen({
              ...modalOpen, modalEdit: true
            })}
          />
          {roles.includes("user") && roles.length < 2 ?
            null :
            <button
              className="py-[1px] px-[4px] text-[18px] text-gray fa-solid fa-trash-can"
              onClick={() => setModalOpen({
                ...modalOpen, modalDelete: true
              })}
            />
          }
        </div>
        <div>{value}</div>
        <div className="flex items-center mx-[3px]">
          <Input
            type="range"
            min="0"
            max="100"
            value={completeProgress}
            disabled={true}
            className="border-0 p-0"
          />
          <div className="min-w-[60px] ml-[5px] font-semibold text-gray text-right">
            <span>{completeProgress}</span>/<span>100</span>
          </div>
        </div>
        <div className="flex items-end mt-[5px]">
          <div className="flex flex-col mr-auto text-[14px] font-normal">
            <p className="mb-[5px]">
              <i className="mr-[4px] text-gray fa-solid fa-hourglass-start"></i>
              <span className="text-green-500">{dateCreation}</span>
            </p>
            <p>
              <i className="mr-[4px] text-gray fa-solid fa-hourglass-end"></i>
              <span className="text-red-500">{dateExpired}</span>
            </p>
          </div>
          <div className="min-w-[22px] min-h-[22px] bg-main-blue rounded-full"></div>
        </div>
      </li>
    </>
  )
}

export default Task