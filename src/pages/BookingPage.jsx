import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Shield, Check } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const { bookingDetails, setBookingDetails, addBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState(
    bookingDetails.passengers.map(p => ({ ...p }))
  );

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handlePassengerUpdate = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setBookingDetails({ passengers });
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store booking in localStorage (in real app, this would be sent to backend)
    const bookingData = {
      id: Date.now().toString(),
      bus: bookingDetails.bus,
      selectedSeats: bookingDetails.selectedSeats,
      passengers,
      totalAmount: bookingDetails.totalAmount,
      user: user?.email || 'Guest',
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      pnr: `BG${Date.now().toString().slice(-6)}`
    };

    addBooking(bookingData);
    
    setIsProcessing(false);
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your bus tickets have been successfully booked.</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Booking Details
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Book Another Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingDetails.bus || bookingDetails.selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Booking Details Found</h2>
          <p className="text-gray-600 mb-8">Please start over by selecting a bus and seats</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(`/seats/${bookingDetails.bus.id}`)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600">Step {currentStep} of 2</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`w-1/2 h-2 rounded-l-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-1/2 h-2 rounded-r-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Passenger Details
            </span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Passenger Information</span>
                </h3>

                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Passenger {index + 1} - Seat {passenger.seatNumber}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={passenger.name}
                            onChange={(e) => handlePassengerUpdate(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                          <input
                            type="number"
                            value={passenger.age}
                            onChange={(e) => handlePassengerUpdate(index, 'age', parseInt(e.target.value))}
                            min="1"
                            max="120"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerUpdate(index, 'gender', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={passengers.some(p => !p.name)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>Payment Information</span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentDetails.cardholderName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                      placeholder="Full name on card"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardholderName}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Pay ₹${bookingDetails.totalAmount}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">Journey</div>
                  <div className="font-semibold">{bookingDetails.bus?.from} → {bookingDetails.bus?.to}</div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.bus?.departureTime} - {bookingDetails.bus?.arrivalTime}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">Bus</div>
                  <div className="font-semibold">{bookingDetails.bus?.operator}</div>
                  <div className="text-sm text-gray-600">{bookingDetails.bus?.busType}</div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">Seats</div>
                  <div className="flex flex-wrap gap-2">
                    {bookingDetails.selectedSeats.map(seat => (
                      <span key={seat.id} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {seat.number}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">Passengers</div>
                  <div className="text-sm">
                    {bookingDetails.selectedSeats.length} passenger(s)
                  </div>
                </div>

                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;