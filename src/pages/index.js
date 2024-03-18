import { lazy } from "react";

const Home = lazy(() => import("./Home"))
const Login = lazy(() => import("./Login"))
const Profile = lazy(() => import("./Profile"))
const Register = lazy(() => import("./Register"))
const AddEvent = lazy(() => import("./AddEvent"))
const EditEvent = lazy(() => import("./EditEvent"))
const AddCourse = lazy(() => import("./AddCourse"))
const EditCourse = lazy(() => import("./EditCourse"))
const EventEnroll = lazy(() => import("./EventEnroll"))
const EventDetail = lazy(() => import("./EventDetail"))
const CourseDetail = lazy(() => import("./CourseDetail"))
const CourseEnroll = lazy(() => import("./CourseEnroll"))
const BookingFailer = lazy(() => import("./BookingFailer"))
const BookingConfirm = lazy(() => import("./BookingConfirm"))

export { Home, Register, Login, Profile, AddCourse, AddEvent, CourseDetail, EditCourse, EventDetail, EditEvent, EventEnroll, BookingConfirm, BookingFailer, CourseEnroll }