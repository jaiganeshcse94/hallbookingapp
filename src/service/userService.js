const rooms = [
    { id: 1, name: 'Grand Hall', seats: 200, amenities: ['Stage', 'Sound System', 'Lighting'], pricePerHour: 500 },
    { id: 2, name: 'Banquet Hall', seats: 150, amenities: ['Catering Service', 'WiFi', 'Projector'], pricePerHour: 300 },
    { id: 3, name: 'Conference Room B', seats: 50, amenities: ['Whiteboard', 'WiFi', 'Video Conferencing'], pricePerHour: 150 },
];

const bookings = [
    { id: 1, customerName: 'John Doe', date: '2024-08-01', startTime: '10:00', endTime: '12:00', roomId: 1, bookedStatus: true },
    { id: 2, customerName: 'Jane Smith', date: '2024-08-02', startTime: '13:00', endTime: '15:00', roomId: 2, bookedStatus: true },
    { id: 3, customerName: 'Alice Johnson', date: '2024-08-03', startTime: '09:00', endTime: '11:00', roomId: 3, bookedStatus: true },
];

const createRoom = (req, res) => {
    try {
        const { name, seats, amenities, pricePerHour } = req.body;
        const newRoom = {
            id: rooms.length + 1,
            name,
            seats,
            amenities,
            pricePerHour,
        };
        rooms.push(newRoom);
        res.status(201).send(newRoom);
    } catch (error) {
        res.status(500).send(error);
    }
}
const booking = (req, res) => {
    try {
        const { customerName, date, startTime, endTime, roomId } = req.body;
        const newBooking = {
            id: bookings.length + 1,
            customerName,
            date,
            startTime,
            endTime,
            roomId,
        };
        bookings.push(newBooking);
        res.status(201).send(newBooking);
    } catch (error) {
        res.status(500).send(error, "message error");
    }
}
const listCustomer = (req, res) => {
        try {
            const roomsWithBookings = bookings.map(booking => {
                const room = rooms.find(room => room.id === booking.roomId);
                return {
                    roomName: room.name,
                    bookedStatus: booking.bookedStatus,
                    customerName: booking.customerName,
                    date: booking.date,
                    startTime: booking.startTime,
                    endTime: booking.endTime,
                };
            });
            res.status(200).send(roomsWithBookings);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    //with booking data
const bookingData = (req, res) => {
    try {
        const customerData = bookings.map(booking => {
            const room = rooms.find(room => room.id === booking.roomId);
            return {
                customerName: booking.customerName,
                roomName: room.name,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
            };
        });
        res.status(200).send(customerData);
    } catch (error) {
        res.status(500).send(error);
    }
}
const bookingFrequency = (req, res) => {
    try {
        const customerName = req.params.customerName;
        const customerBookings = bookings.filter(booking => booking.customerName.toLowerCase() === customerName.toLowerCase());

        if (customerBookings.length === 0) {
            return res.status(404).send({ message: 'No bookings found for this customer' });
        }

        const customerBookingData = customerBookings.map(booking => {
            const room = rooms.find(room => room.id === booking.roomId);
            return {
                customerName: booking.customerName,
                roomName: room.name,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking.id,
                bookingDate: booking.date,
                bookingStatus: 'Booked'
            };
        });

        res.status(200).send(customerBookingData);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    createRoom,
    booking,
    listCustomer,
    bookingData,
    bookingFrequency
};