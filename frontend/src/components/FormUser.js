import { useState } from "react"
import Input from "./utils/Input"
import validateManyFields, { fieldError } from "../validations"
import { api } from "../services/ApiService"
import { toast } from "react-toastify"

const FormUser = ({ setActive, userName, userEmail, hasRoles, roles, userId }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    userName,
    userEmail,
    roles: hasRoles
  })
  const [editUser] = api.useEditUserMutation()

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
    if (e.target.name === "roles") {
      const options = e.target.options;
      const values = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      setFormData({
        ...formData, [e.target.name]: values
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = validateManyFields("user", formData);
    setFormErrors({})
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}))
      return
    }
    await editUser({ userId, formData }).unwrap()
      .then((payload) => toast.success(payload.message))
      .catch((error) => toast.error(error.data.message))
    setActive(false)
  }

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="userName"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Имя пользователя
        </label>
        <Input
          type="text"
          name="userName"
          id="userName"
          defaultValue={formData.userName}
          maxlength={20}
          onChange={handleChange}
        />
        {fieldError(formErrors, "userName")}
      </div>
      <div className="mb-4">
        <label
          htmlFor="userEmail"
          className="ml-[5px] mb-[5px] font-semibold text-[18px] after:content-['*'] after:ml-0.5 after:text-red-500">
          Email пользователя
        </label>
        <Input
          type="text"
          name="userEmail"
          id="userEmail"
          defaultValue={formData.userEmail}
          maxlength={50}
          onChange={handleChange}
        />
        {fieldError(formErrors, "userEmail")}
      </div>
      <div className="flex flex-col">
        <label htmlFor="roles" className="ml-[5px] mb-[5px] font-semibold text-[18px]">Роли</label>
        <select
          id="roles"
          name="roles"
          defaultValue={formData.roles}
          multiple={true}
          className="ml-[5px] max-h-[50px] text-[16px] bg-transparent focus:outline-0"
          onChange={handleChange}
        >
          {roles && roles.map(role => (
            <option
              key={role._id}
              value={role._id}
              className="px-[10px] py-[5px] mr-[5px] rounded-[10px] inline-block"
            >
              {role.value}
            </option>
          ))}
        </select>
      </div>
      <button
        className="block ml-auto py-[3px] px-[10px] rounded-[10px] border border-main-dark bg-neutral-100"
        onClick={handleSubmit}>
        Обновить пользователя
      </button>
    </form>
  )
}

export default FormUser