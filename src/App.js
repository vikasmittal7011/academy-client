import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/common/Layout"
import { Home, Login, Profile, Register } from "./pages"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDataAsync } from "./features/user/userSlice"
import { selectauth } from "./features/auth/authSlice"
import Loading from "./components/common/Loading"
import Protected from "./components/common/Protected"

const App = () => {

  const { registerSuccess, loginSuccess, logoutSuccess, user } = useSelector(selectauth)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        dispatch(fetchUserDataAsync());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginSuccess, registerSuccess, logoutSuccess]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route exact path="/login/:token?" element={<Layout><Login /></Layout>} />
          <Route exact path="/register" element={<Layout><Register /></Layout>} />
          <Route exact path="/my-profile" element={<Protected><Layout><Profile /></Layout></Protected>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
