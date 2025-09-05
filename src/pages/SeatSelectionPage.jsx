import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, DollarSign } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const SeatSelectionPage = () => {
  const { busId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookingDetails, setBookingDetails } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch seat layout
    const fetchSeats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSeats = [];
      const totalSeats = bookingDetails.bus?.totalSeats || 40;
      const availableSeats = bookingDetails.bus?.availableSeats || 12;
      const bookedSeats = totalSeats - availableSeats;
      
      for (let i = 1; i <= totalSeats; i++) {
        const seatNumber = `${Math.ceil(i / 4)}${String.fromCharCode(64 + ((i - 1) % 4) + 1)}`;
        const isAvailable = i > bookedSeats;
        
        mockSeats.push({
          id: `seat-${i}`,
          number: seatNumber,
          isAvailable,
          isSelected: false,
          price: bookingDetails.bus?.price || 45,
          type: (i % 4 === 1 || i % 4 === 0) ? 'window' : 'aisle'
        });
      }
      
      setSeats(mockSeats);
      setLoading(false);
    };

    fetchSeats();
  }, [busId, bookingDetails.bus]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || !seat.isAvailable) return;

    if (selectedSeats.some(s => s.id === seatId)) {
      // Deselect seat
      const newSelectedSeats = selectedSeats.filter(s => s.id !== seatId);
      setSelectedSeats(newSelectedSeats);
      setSeats(seats.map(s => 
        s.id === seatId ? { ...s, isSelected: false } : s
      ));
    } else if (selectedSeats.length < 4) {
      // Select seat (max 4 seats)
      const newSelectedSeats = [...selectedSeats, seat];
      setSelectedSeats(newSelectedSeats);
      setSeats(seats.map(s => 
        s.id === seatId ? { ...s, isSelected: true } : s
      ));
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
      setBookingDetails({ 
        selectedSeats, 
        totalAmount,
        passengers: selectedSeats.map(seat => ({
          name: '',
          age: 18,
          gender: 'male',
          seatNumber: seat.number
        }))
      });
      navigate('/booking');
    }
  };

  const getSeatColor = (seat) => {
    if (!seat.isAvailable) return 'bg-red-200 text-red-800 cursor-not-allowed';
    if (seat.isSelected) return 'bg-green-500 text-white';
    return 'bg-gray-200 text-gray-700 hover:bg-blue-100 cursor-pointer';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading seat layout...</p>
        </div>
      </div>
    );
  }

  if (!bookingDetails.bus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bus Not Found</h2>
          <p className="text-gray-600 mb-8">Please select a bus from the listing</p>
          <button
            onClick={() => navigate('/buses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Bus List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/buses')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Select Your Seats</h1>
            <p className="text-gray-600">{bookingDetails.bus.operator} - {bookingDetails.bus.from} to {bookingDetails.bus.to}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Choose Your Seats</h3>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    <span>Booked</span>
                  </div>
                </div>

                {/* Driver Section */}
                <div className="flex justify-end mb-4">
                  <div className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">Driver</div>
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {seats.map((seat, index) => {
                    const isAisle = (index % 4 === 1);
                    return (
                      <div key={seat.id} className="relative">
                        <button
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={!seat.isAvailable}
                          className={`w-12 h-12 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${getSeatColor(seat)} ${
                            seat.isSelected ? 'border-green-500' : 'border-transparent'
                          }`}
                        >
                          {seat.number}
                        </button>
                        {isAisle && <div className="absolute top-0 -right-2 w-2 h-full bg-gray-100"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">Bus Details</div>
                  <div className="font-semibold">{bookingDetails.bus.operator}</div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.bus.departureTime} - {bookingDetails.bus.arrivalTime}
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="border-b pb-4">
                    <div className="text-sm text-gray-600 mb-2">Selected Seats</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat.id} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {seat.number}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Passengers</span>
                  </span>
                  <span className="font-semibold">{selectedSeats.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Total Amount</span>
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={selectedSeats.length === 0}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Proceed to Booking
              </button>

              {selectedSeats.length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please select at least one seat to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;