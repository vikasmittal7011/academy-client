import moment from "moment";

const Details = ({ event }) => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl md:text-3xl tracking-wide">{event.name}</h1>
            <p>Venue : {event?.location?.address}, {event?.location?.state}, {event?.location?.country}, {event?.location?.zipCode}</p>
            <a className="underline" href={event?.location?.mapLocation} rel="noreferrer" target="_blank">Map Location</a>
            <p>Start Date : {moment(event.startDate).format('MMMM Do YYYY, h:mm a')}</p>
            <p>End Date : {moment(event.endDate).format('MMMM Do YYYY, h:mm a')}</p>
            <p>Fees : ₹ {event.fees} /-</p>
        </div>
    )
}

export default Details
