import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/common/Layout"
import { AddCourse, AddEvent, BookingConfirm, BookingFailer, CourseDetail, EditCourse, EditEvent, EventDetail, EventEnroll, Home, Login, Profile, Register } from "./pages"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDataAsync } from "./features/user/userSlice"
import { selectauth } from "./features/auth/authSlice"
import Loading from "./components/common/Loading"
import BasicProtected from "./components/protection/BasicProtected"
import AdminProtected from "./components/protection/AdminProtected"

const App = () => {

  const { registerSuccess, loginSuccess, logoutSuccess } = useSelector(selectauth)

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchUserDataAsync());
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginSuccess, registerSuccess, logoutSuccess]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route exact path="/login/:token?"
            element={<Layout><Login /></Layout>} />
          <Route exact path="/register"
            element={<Layout><Register /></Layout>} />
          <Route exact path="/my-profile"
            element={<BasicProtected><Layout><Profile /></Layout></BasicProtected>} />
          <Route exact path="/course/:id?"
            element={<Layout><CourseDetail /></Layout>} />
          <Route exact path="/event/:id?"
            element={<Layout><EventDetail /></Layout>} />
          <Route exact path="/add-course"
            element={<AdminProtected><Layout><AddCourse /></Layout></AdminProtected>} />
          <Route exact path="/edit-course/:id?"
            element={<AdminProtected><Layout><EditCourse /></Layout></AdminProtected>} />
          <Route exact path="/edit-event/:id?"
            element={<AdminProtected><Layout><EditEvent /></Layout></AdminProtected>} />
          <Route exact path="/add-event"
            element={<AdminProtected><Layout><AddEvent /></Layout></AdminProtected>} />
          <Route exact path="/event/register/:id?/:referCode?"
            element={<BasicProtected><Layout><EventEnroll /></Layout></BasicProtected>} />
          <Route path="/failer/:message" exact
            element={<BookingFailer />}></Route>
          <Route path="/confirm/:id" exact
            element={<BookingConfirm />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
}

export default App
