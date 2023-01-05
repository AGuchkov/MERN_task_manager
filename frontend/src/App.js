import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import { useDispatch, useSelector } from "react-redux"
import { userIsAuth } from "./store/actions/userAction"
import { useEffect } from "react"

function App() {
  const {isLoggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    dispatch(userIsAuth(token))
  }, [isLoggedIn, dispatch])

  return (
    <div className="max-w-[1400px] min-h-screen mx-auto px-[15px]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace/> : <LoginPage />} />
          <Route path="/registration" element={isLoggedIn ? <Navigate to="/" replace/> : <RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
