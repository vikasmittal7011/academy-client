const payment = (callBackURL, key, data, user, event) => {
    const options = {
        key,
        amount: +data.data.amount,
        currency: "INR",
        name: "Vikey's Acadmey",
        description: "Vikey's Acadmey Online Payment",
        image: `https://cdn.pixabay.com/photo/2016/10/09/19/19/coins-1726618_640.jpg`,
        order_id: data.data.id,
        callback_url: callBackURL,
        prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact
        },
        notes: {
            address: "Razorpay Corporate Office",
            bookingInfo: { ...event, hotel: event.id }
        },
        theme: {
            color: "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open()
}

export default payment