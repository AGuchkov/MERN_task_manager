const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const validate = (group, name, value) => {

  if (group === "registration") {
    switch (name) {
      case "userName": {
        if (!value) return "Поле должно быть заполнено"
        return null;
      }
      case "userEmail": {
        if (!value) return "Поле должно быть заполнено"
        if (!isValidEmail(value)) return "Пожалуйста введите корректный Email"
        return null;
      }
      case "password": {
        if (!value) return "Поле должно быть заполнено"
        if (value.length < 5) return "Пароль должен быть не менее 5 символов"
        return null
      }
      default: return null
    }
  }

  else if (group === "login") {
    switch (name) {
      case "userEmail": {
        if (!value) return "Поле должно быть заполнено"
        if (!isValidEmail(value)) return "Пожалуйста введите корректный Email"
        return null
      }
      case "password": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      default: return null
    }
  }
  else if (group === "taskAdd") {
    switch (name) {
      case "title": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      case "value": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      case "expiredDate": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      default: return null
    }
  }

  else if (group === "userEdit") {
    switch (name) {
      case "userName": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      case "userEmail": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      case "roles": {
        if (!value) return "Поле должно быть заполнено"
        return null
      }
      default: return null
    }
  }

  else {
    return null
  }

}

const validateManyFields = (group, list) => {
  const errors = []
  for (const field in list) {
    const err = validate(group, field, list[field])
    if (err) errors.push({ field, err })
  }
  return errors
}

export const fieldError = (err, field) => (
  <p className={`mt-1 text-red-500 text-sm ${err[field] ? "block" : "hidden"}`}>
    <i className="mr-2 fa-solid fa-circle-exclamation"></i>
    {err[field]}
  </p>
)

export default validateManyFields