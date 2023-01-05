import { useSelector } from "react-redux"
import Task from "./Task"

const TaskList = ({ stages, tasks, stageId, users }) => {
  const authState = useSelector((state) => state.user)
  const userId = authState.userData._id

  return (
    <ul>
      {tasks && tasks.filter(task => task.carryOut === userId)
        .filter(task => task.stage === stageId)
        .map(task => (
          <Task
            key={task._id}
            id={task._id}
            title={task.title}
            value={task.value}
            completeProgress={task.completeProgress}
            creationDate={task.creationDate}
            expiredDate={task.expiredDate}
            targetStage={stageId}
            stages={stages}
            users={users}
          />
        ))}
    </ul>
  )
}

export default TaskList