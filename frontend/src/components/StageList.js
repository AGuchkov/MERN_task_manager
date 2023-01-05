import { useEffect, useState } from "react"
import TaskList from "./TaskList"
import Dropdown from "./utils/Dropdown"
import { sorting } from "../common_fun"

const StageList = ({ stages, tasks, users }) => {
  const [reverse, setReverse] = useState(false)
  const [selected, setSelected] = useState({ name: "по имени", value: "title" })
  const [sortedTaskArr, setSortedTaskArr] = useState([])

  useEffect(() => {
    if (tasks) {
      setSortedTaskArr(sorting(tasks, selected.value, reverse))
    }
  }, [tasks, selected, reverse])

  return (
    <ul className="basis-9/12 flex flex-wrap grow mx-[-9px] pr-[9px]">
      {stages && stages.map(stage => (
        <li
          key={stage._id}
          className="basis-full px-[9px] md:basis-1/2 lg:basis-1/4">
          <div className="flex items-center mb-[15px]">
            <h2 className="text-[20px] mr-auto font-bold capitalize">{stage.name}</h2>
            <Dropdown
              selected={selected}
              setSelected={setSelected}
              reverse={reverse}
              setReverse={setReverse}
            />
          </div>
          <TaskList
            stageId={stage._id}
            stages={stages}
            tasks={sortedTaskArr}
            users={users}
            selected={selected}
          />
        </li>
      ))}
    </ul>
  )
}

export default StageList