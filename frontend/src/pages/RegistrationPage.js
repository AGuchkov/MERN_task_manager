import FormRegistration from "../components/FormRegistration"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/utils/Loader"

function RegistrationPage() {
  const authState = useSelector((state) => state.user)

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="px-8 py-5 shadow-custom rounded-[10px]">
        <h1 className="mb-4 text-center text-[24px] font-semibold">{authState.loading ? "Идет загрузка" : "Зарегистрироваться"}</h1>
        {authState.loading ? <Loader /> :
          <>
            <FormRegistration />
            <Link to="/login" className="block mt-3 text-center text-[18px] hover:underline">Уже зарегистрированы?</Link>
          </>
        }
      </div>
    </div>
  )
}

export default RegistrationPage
