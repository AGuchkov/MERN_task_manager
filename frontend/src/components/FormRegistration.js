import { useState } from "react"
import { useDispatch } from "react-redux"
import { userRegister } from "../store/actions/userAction"
import Input from "./utils/Input"
import validateManyFields, { fieldError } from "../validations"

const FormRegistration = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: ""
  })
  const dispatch = useDispatch()

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validateManyFields("registration", formData);
    setFormErrors({})
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}))
      return
    }
    dispatch(userRegister(formData))
  }

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="userName"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Имя
        </label>
        <Input
          type="text"
          name="userName"
          id="userName"
          value={formData.userName}
          maxlength={20}
          onChange={handleChange}
        />
        {fieldError(formErrors, "userName")}
      </div>
      <div className="mb-4">
        <label
          htmlFor="userEmail"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Email
        </label>
        <Input
          type="text"
          name="userEmail"
          id="userEmail"
          value={formData.userEmail}
          maxlength={20}
          onChange={handleChange}
        />
        {fieldError(formErrors, "userEmail")}
      </div>
      <div className="mb-7">
        <label
          htmlFor="password"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Пароль
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          maxlength={20}
          onChange={handleChange}
        />
        {fieldError(formErrors, "password")}
      </div>
      <button
        className="block w-full mt-2 p-[10px] rounded-[10px] bg-main-blue text-neutral-100 text-semibold hover:bg-indigo-600"
        onClick={handleSubmit}>
        Зарегистрироваться
      </button>
    </form>
  )
}

export default FormRegistration