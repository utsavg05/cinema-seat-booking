import React, { useMemo, useState } from 'react'

const CinemaSeatBooking = ({
    layout = {
        rows: 8,
        seatsPerRow: 12,
        aislePosition: 5,
    },
    seatTypes = {
        regular: { name: 'regular', price: 150, rows: [0, 1, 2] },
        premium: { name: 'premium', price: 250, rows: [3, 4, 5] },
        vip: { name: 'vip', price: 350, rows: [6, 7] },
    },
    bookedSeats = [],
    currency = "₹",
    onBookingComplete = () => { },
    title = 'Cinema hall ticket booking',
    subTitle = 'Select your prefered seats',

}) => {

    const getSeatType = () => {
        // todo
    }

    const initializeSeats = useMemo(() => {

        const seats = []
        for (let row = 0; row < layout.rows; row++) {
            const seatRow = []
            const seatTypeInfo = getSeatType(row)

            for (let seat = 0; seat < layout.seatsPerRow; seat++) {
                const seatId = `${String.fromCharCode(65 + row)}${seat + 1}}`

                seatRow.push({
                    id: seatId,
                    row,
                    seat,
                    type: seatTypeInfo?.type || 'regular',
                    price: seatTypeInfo?.price || '150',
                    color: seatTypeInfo?.color || 'blue',
                    status: bookedSeats.includes(seatId) ? 'booked' : 'available',
                    selected: false
                })
            }
            seats.push(seatRow)
        }
        return seats

    }, [layout, seatTypes, bookedSeats])

    const [seats, setSeats] = useState(initializeSeats)

    const renderSeatSection = () => {
        
    }

    return (
        <div className='w-full min-h-screen bg-gray-50 p-4'>
            {/* title */}
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
                <h1 className='text-2xl lg:text-3xl mb-2 text-gray-900 font-bold text-center'>{title}</h1>
                <p className='text-center mb-2 text-gray-600'>{subTitle}</p>

                {/* screen */}
                <div className='mb-8'>
                    <div className='w-full rounded-lg mb-2 shadow-inner h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300' />
                    <p className='text-center text-sm text-gray-600 font-medium'>SCREEN</p>
                </div>
                {/* seat-map */}
                <div className='mb-6 overflow-x-auto'>
                    <div className='flex flex-col min-w-max items-center'>
                        {seats.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx} className='flex items-center mb-2'>
                                    <span className='w-8 mr-4 text-center font-bold text-gray-600'>
                                        {String.fromCharCode(65 + rowIdx)}
                                    </span>
                                    {renderSeatSection(row, 0, layout.aislePosition)}
                                    {/* aisle */}
                                    {renderSeatSection(row, layout.aislePosition, layout.seatsPerRow)}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* legend */}
                {/* summary  */}
                {/* book-btn */}
            </div>
        </div>
    )
}

export default CinemaSeatBooking