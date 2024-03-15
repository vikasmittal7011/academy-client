const TimeSection = ({ heading, setSelectedFetching, selectedFetching }) => {
    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {heading}
            </h1>
            <div className="w-full grid grid-cols-5 my-5 gap-5 text-center">
                <span onClick={() => setSelectedFetching("all")} className={`text-lg font-semibold cursor-pointer ${selectedFetching === "all" && "border-b border-blue-500"}`}>All</span>
                <span onClick={() => setSelectedFetching("day")} className={`text-lg font-semibold cursor-pointer ${selectedFetching === "day" && "border-b border-blue-500"}`}>1 Day</span>
                <span onClick={() => setSelectedFetching("week")} className={`text-lg font-semibold cursor-pointer ${selectedFetching === "week" && "border-b border-blue-500"}`}>1 Week</span>
                <span onClick={() => setSelectedFetching("month")} className={`text-lg font-semibold cursor-pointer ${selectedFetching === "month" && "border-b border-blue-500"}`}>1 Month</span>
                <span onClick={() => setSelectedFetching("year")} className={`text-lg font-semibold cursor-pointer ${selectedFetching === "year" && "border-b border-blue-500"}`}>1 Year</span>
            </div>
        </>
    )
}

export default TimeSection
