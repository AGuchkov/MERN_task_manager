import { useEffect, useState } from "react"
import Input from "./Input"

const DropField = ({ item, fields, setFields }) => {
  const [reverse, setReverse] = useState(false)
  const [checked, setChecked] = useState(fields.find(el => el.field === item.value))

  useEffect(() => {
    const temp = [...fields]
    const field = temp.find(el => el.field === item.value)
    const i = temp.indexOf(field)
    if (field) {
      temp[i].reverse = reverse
    }
    setFields(temp)
  }, [reverse]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => {
    setChecked(!checked)
    if (fields.find(el => el.field === e.target.name)) {
      return setFields(fields.filter(el => el.field !== e.target.name))
    }
    setFields([...fields, { "field": e.target.name, "reverse": reverse }])
  }

  return (
    <li
      className={checked ?
        "flex justify-between font-medium cursor-pointer transition hover:bg-main-blue hover:text-neutral-100 active" :
        "flex justify-between font-medium cursor-pointer transition hover:bg-main-blue hover:text-neutral-100"}
    >
      <Input type="checkbox" name={item.value} id={item.value} className="hidden" checked={checked} onChange={handleChange} />
      <label htmlFor={item.value} className="w-full pl-[16px] py-[12px]">{item.name}</label>
      <button
        onClick={() => setReverse(!reverse)}
        className={!reverse ? "w-[40px] shrink-0 transition reverse" : "w-[40px] shrink-0 transition reverse rotate-180"}
      />
    </li>
  )
}
export default DropField