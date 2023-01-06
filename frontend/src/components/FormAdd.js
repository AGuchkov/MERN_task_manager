import { useState } from "react"
import Input, { Textarea } from "./utils/Input"
import validateManyFields, { fieldError } from "../validations"
import { api } from "../services/ApiService"
import { toast } from "react-toastify"
import { changeFormatDate } from "../common_fun"

const FormAdd = ({ setActive }) => {
  const [addNewTask] = api.useAddNewTaskMutation()
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    expiredDate: "",
  })

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
    if (e.target.name === "expiredDate") {
      setFormData({
        ...formData, expiredDate: Math.floor((new Date(e.target.value) / 1000) * 1000).toString()
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
    await addNewTask(formData).unwrap()
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
          maxlength={400}
          onChange={handleChange}
        />
        {fieldError(formErrors, "value")}
      </div>
      <div className="mb-4">
        <label
          htmlFor="expiredDate"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Дата сдачи
        </label>
        <Input
          type="date"
          name="expiredDate"
          id="expiredDate"
          min={changeFormatDate()}
          onChange={handleChange}
        />
        {fieldError(formErrors, "expiredDate")}
      </div>
      <button
        className="block ml-auto py-[3px] px-[10px] rounded-[10px] border border-main-dark bg-neutral-100"
        onClick={handleSubmit}>
        Создать задачу
      </button>
    </form>
  )
}

export default FormAdd