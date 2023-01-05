import { useState } from "react"

const Dropdown = ({ selected, setSelected, reverse, setReverse }) => {
  const [open, setOpen] = useState(false)

  const sort = [
    { name: "по имени", value: "title" },
    { name: "по дате создания", value: "creationDate" },
    { name: "по дате сдачи", value: "expiredDate" },
  ]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-[5px] text-[26px] text-gray rounded-[5px] fa-solid fa-ellipsis transition hover:bg-main-blue"></button>
      {open && <ul className="absolute w-max top-8 right-0 rounded-[10px] overflow-hidden shadow-custom z-10 bg-neutral-100">
        {sort.map((item, i) => (
          <li
            key={i}
            onClick={() => setSelected(item)}
            className={selected.value === item.value ?
              "flex justify-between px-[16px] py-[12px] font-medium cursor-pointer transition hover:bg-main-blue hover:text-neutral-100 active" :
              "flex justify-between px-[16px] py-[12px] font-medium cursor-pointer transition hover:bg-main-blue hover:text-neutral-100"}>
            <span className="mr-4">{item.name}</span>
            <button
              onClick={() => setReverse(!reverse)}
              className={!reverse ? "w-[24px] h-[24px] transition reverse" : "w-[24px] h-[24px] transition reverse rotate-180"}
            />
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default Dropdown