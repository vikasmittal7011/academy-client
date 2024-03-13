import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/common/Layout"
import { Home, Login, Register } from "./pages"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDataAsync } from "./features/user/userSlice"
import { selectauth } from "./features/auth/authSlice"
import Loading from "./components/common/Loading"

const App = () => {

  const { registerSuccess, loginSuccess, logoutSuccess } = useSelector(selectauth)

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchUserDataAsync());
    }, 1000);
  }, [dispatch, loginSuccess, registerSuccess, logoutSuccess]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route exact path="/login/:token?" element={<Layout><Login /></Layout>} />
          <Route exact path="/register" element={<Layout><Register /></Layout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
