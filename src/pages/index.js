import { lazy } from "react";

const Home = lazy(() => import("./Home"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const Profile = lazy(() => import("./Profile"))

export { Home, Register, Login, Profile }