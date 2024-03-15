import { lazy } from "react";

const Home = lazy(() => import("./Home"))
const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))
const Profile = lazy(() => import("./Profile"))
const AddCourse = lazy(() => import("./AddCourse"))
const AddEvent = lazy(() => import("./AddEvent"))
const CourseDetail = lazy(() => import("./CourseDetail"))
const EventDetail = lazy(() => import("./EventDetail"))
const EditCourse = lazy(() => import("./EditCourse"))
const EditEvent = lazy(() => import("./EditEvent"))
const EventEnroll = lazy(() => import("./EventEnroll"))
const BookingConfirm = lazy(() => import("./BookingConfirm"))
const BookingFailer = lazy(() => import("./BookingFailer"))
const CourseEnroll = lazy(() => import("./CourseEnroll"))

export { Home, Register, Login, Profile, AddCourse, AddEvent, CourseDetail, EditCourse, EventDetail, EditEvent, EventEnroll, BookingConfirm, BookingFailer, CourseEnroll }