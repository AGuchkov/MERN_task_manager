import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { api } from "../services/ApiService"
import Header from "../components/Header"
import ProgressList from "../components/ProgressList"
import StageList from "../components/StageList"
import AdminBar from "../components/AdminBar"
import { useEffect, useState } from "react"

function MainPage() {
  const [adminId, setAdminId] = useState('')
  const { isLoggedIn, userData } = useSelector((state) => state.user)
  const stages = api.useGetAllStageQuery()
  const roles = api.useGetAllRolesQuery()
  const users = api.useGetAllUserQuery()
  const tasks = api.useGetAllTaskQuery()

  useEffect(() => {
    if (roles.data) {
      const { _id } = roles.data.find(el => el.value === 'admin')
      setAdminId(_id)
    }
  }, [roles])

  const hasRoles = userData.roles

  return (
    <>
      <Header adminId={adminId}/>
      <div className={`flex flex-col grow ${isLoggedIn ? "xl:flex-row" : null}`}>
        {!isLoggedIn ?
          <div className="bg-inherit p-8 text-center">
            <h1 className="text-2xl font-semibold">Добро пожаловать в Task Manager App</h1>
            <div className="flex justify-center items-center mt-[40px]">
              <Link to="/login" className="inline-block min-w-[227px] text-xl space-x-2 p-[10px] rounded-[10px] bg-main-blue text-neutral-100 hover:space-x-4 hover:bg-indigo-600">
                <span className="relative mr-4 text-base transition-[margin]"><i className="fa-solid fa-arrow-left"></i></span>
                <span className="transition-[margin]">Войдите</span>
              </Link>
              <span className="mx-[15px] text-xl font-semibold">или</span>
              <Link to="/registration" className="inline-block min-w-[227px] text-xl space-x-2 p-[10px] rounded-[10px] bg-main-blue text-neutral-100 hover:space-x-4 hover:bg-indigo-600">
                <span className="transition-[margin]">Зарегистрируйтесь</span>
                <span className="relative ml-4 text-base transition-[margin]"><i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            </div>
            <p className="mt-[20px] text-xl font-semibold">для начала работы</p>
          </div>
          : null}
        {isLoggedIn && hasRoles.includes(adminId) ? <AdminBar users={users.data} roles={roles.data} /> : null}
        {isLoggedIn && !hasRoles.includes(adminId) ?
          <>
            <StageList stages={stages.data} tasks={tasks.data} users={users.data} />
            <ProgressList tasks={tasks.data} />
          </>
          : null}
      </div>
    </>
  )
}

export default MainPage