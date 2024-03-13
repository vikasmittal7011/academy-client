import { lazy } from "react";

const Home = lazy(() => import("./Home"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const Profile = lazy(() => import("./Profile"))
const AddCourse = lazy(() => import("./AddCourse"))
const AddEvent = lazy(() => import("./AddEvent"))

export { Home, Register, Login, Profile, AddCourse, AddEvent }