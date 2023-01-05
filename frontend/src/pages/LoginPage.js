import FormLogin from "../components/FormLogin"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/utils/Loader"

function LoginPage() {
  const authState = useSelector((state) => state.user)

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="px-8 py-5 shadow-custom rounded-[10px]">
        <h1 className="mb-4 text-center text-[24px] font-semibold">{authState.loading ? "Идет загрузка" : "Войти"}</h1>
        {authState.loading === true ? <Loader /> :
          <>
            <FormLogin />
            <Link to="/registration" className="block mt-3 text-center text-[18px] hover:underline">Зарегестрироваться?</Link>
          </>
        }
      </div>
    </div>
  )
}

export default LoginPage
