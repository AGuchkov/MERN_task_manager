import { useState } from "react"
import Input, { Textarea } from "./utils/Input"
import validateManyFields, { fieldError } from "../validations"
import { api } from "../services/ApiService"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { changeFormatDate } from "../common_fun"

const FormEdit = ({ setActive, title, value, completeProgress, expiredDate, targetStage, stages, taskId, users }) => {
  const { userData } = useSelector((state) => state.user)
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title,
    value,
    expiredDate,
    completeProgress,
    carryOut: userData._id,
    stage: targetStage
  })
  const [editTask] = api.useEditTaskMutation()

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
    if (e.target.name === "expiredDate") {
      setFormData({
        ...formData, [e.target.name]: new Date(e.target.value).toISOString()
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = validateManyFields("task", formData);
    setFormErrors({})
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}))
      return
    }
    await editTask({ taskId, formData }).unwrap()
      .then((payload) => toast.success(payload.message))
      .catch((error) => toast.error(error.data.message))
    setActive(false)
  }

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Задача
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          defaultValue={formData.title}
          maxlength={20}
          onChange={handleChange}
        />
        {fieldError(formErrors, "title")}
      </div>
      <div className="mb-4">
        <label
          htmlFor="value"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Описание задачи
        </label>
        <Textarea
          type="text"
          name="value"
          id="value"
          defaultValue={formData.value}
          maxlength={400}
          onChange={handleChange}
        />
        {fieldError(formErrors, "value")}
      </div>
      <div className="flex items-center mx-[3px] mb-4">
        <Input
          id="completeProgress"
          name="completeProgress"
          type="range"
          max="100"
          defaultValue={formData.completeProgress}
          className="border-0 p-0"
          disabled={false}
          onChange={handleChange}
        />
        <label
          htmlFor="completeProgress"
          className="min-w-[60px] ml-[5px] font-semibold text-gray text-right">
          <span>{formData.completeProgress}</span>/<span>100</span>
        </label>
      </div>
      {users &&
        <div className="mb-4">
          <label htmlFor="carryOut" className="ml-[5px] mb-[5px] font-semibold text-[18px]">Назначить на</label>
          <select
            id="carryOut"
            name="carryOut"
            defaultValue={userData._id}
            className="block w-full p-[10px] rounded-[10px] border border-main-dark text-[16px] lowercase focus:transition"
            onChange={handleChange}
          >
            {users && users.map(user => (
              <option key={user._id} value={user._id}>{user.userEmail}</option>
            ))}
          </select>
        </div>
      }
      <div className="mb-4">
        <label htmlFor="stage" className="ml-[5px] mb-[5px] font-semibold text-[18px]">Стадия</label>
        <select
          id="stage"
          name="stage"
          defaultValue={targetStage}
          className="block w-full p-[10px] rounded-[10px] border border-main-dark text-[16px] focus:transition"
          onChange={handleChange}
        >
          {stages && stages.map(stage => (
            <option key={stage._id} value={stage._id}>{stage.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="expiredDate" className="ml-[5px] mb-[5px] font-semibold text-[18px]">Дата сдачи</label>
        <Input
          type="date"
          name="expiredDate"
          id="expiredDate"
          defaultValue={changeFormatDate(formData.expiredDate)}
          min={changeFormatDate()}
          onChange={handleChange}
        />
        {fieldError(formErrors, "expiredDate")}
      </div>
      <button
        className="block ml-auto py-[3px] px-[10px] rounded-[10px] border border-main-dark bg-neutral-100"
        onClick={handleSubmit}>
        Обновить задачу
      </button>
    </form>
  )
}

export default FormEdit