import { useState } from "react"
import DropField from "./DropField"

const Dropdown = ({ fields, setFields }) => {
  const [open, setOpen] = useState(false)

  const sortTypes = [
    { name: "по имени", value: "title" },
    { name: "по дате создания", value: "creationDate" },
    { name: "по дате сдачи", value: "expiredDate" },
  ]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-[5px] text-[26px] text-gray rounded-[5px] fa-solid fa-ellipsis transition hover:bg-main-blue"></button>
      {open && <ul className="absolute w-max top-8 right-0 rounded-[10px] overflow-hidden shadow-custom z-10 bg-neutral-100">
        {sortTypes.map((item, i) => (
          <DropField key={i} item={item} fields={fields} setFields={setFields} />
        ))}
      </ul>}
    </div>
  )
}

export default Dropdown