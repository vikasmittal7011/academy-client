import moment from "moment"

const UserDetails = ({ e }) => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl md:text-2xl tracking-wide">{e.user.firstName} {e.user.lastName}</h1>
            <p>Email : {e.user.email}</p>
            <p>Date Of Enroll : {moment(e.dateOfEnroll).format('MMMM Do YYYY, h:mm a')}</p>
            <p>Refer Involves : {e.referCode === "" ? "No" : "Yes"} </p>
            <p>Number Of Seat : {e.numberOfSeat} </p>
            <p>Total Paid : {e.totalPrice} </p>
        </div>
    )
}

export default UserDetails
