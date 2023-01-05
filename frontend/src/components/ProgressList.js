import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Input from "./utils/Input"
import Loader from "./utils/Loader"

const ProgressList = ({ tasks }) => {
  const [progressArr, setProgressArr] = useState([])
  const authState = useSelector((state) => state.user)
  const userId = authState.userData._id

  useEffect(() => {
    if (tasks) {
      const result = []
      let temp = [...tasks]
      temp = temp.filter(task => task.carryOut === userId)

      const groupedTasks = Object.values(temp.reduce((groupedTasks, task) => (task.title in groupedTasks ? groupedTasks[task.title].push(task) : groupedTasks[task.title] = [task], groupedTasks), {}))

      groupedTasks.forEach(item => {
        const resultItem = {
          title: '',
          numberOfComplete: '',
          numberOfTotal: '',
        }

        resultItem.title = item[0].title
        resultItem.numberOfComplete = item.filter(task => task.completeProgress === 100).length
        resultItem.numberOfTotal = item.length

        result.push(resultItem)
      })

      setProgressArr(result)
    }
  }, [tasks, userId])

  return (
    <div className="basis-3/12 w-full mt-[50px] xl:mt-0">
      <div className="p-[14px] bg-white rounded-[10px] xl:py-0 xl:bg-inherit">
        <h2 className="mb-[20px] text-[20px] font-bold">Task Progress</h2>
        <ul className="progress_list">
          {!progressArr && <Loader />}
          {progressArr && progressArr.map(item => (
            <li key={item.title} className="flex flex-col mb-[10px]">
              <h2 className="mr-auto py-[3px] px-[10px] text-[14px] rounded-[10px] bg-sky-100 text-sky-600 font-bold">{item.title}</h2>
              <div className="flex items-center mx-[3px]">
                <Input
                  type="range"
                  min="0"
                  max={item.numberOfTotal}
                  value={item.numberOfComplete}
                  disabled={true}
                  className="border-0 p-0"
                />
                <div className="min-w-[40px] ml-[5px] font-semibold text-gray text-right">
                  <span>{item.numberOfComplete}</span>/<span>{item.numberOfTotal}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProgressList