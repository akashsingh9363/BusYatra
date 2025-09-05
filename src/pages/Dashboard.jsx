import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { Calendar, Clock, MapPin, Download, User, CreditCard } from 'lucide-react';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const { allBookings } = useBooking();

  const downloadReceipt = (booking) => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(37, 99, 235);
    pdf.text('BusYatra', 20, 30);
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Booking Receipt', 20, 50);
    
    // Booking details
    pdf.setFontSize(12);
    pdf.text(`Booking ID: ${booking.id}`, 20, 70);
    pdf.text(`PNR: ${booking.pnr}`, 20, 85);
    pdf.text(`Route: ${booking.bus.from} → ${booking.bus.to}`, 20, 100);
    pdf.text(`Date: ${new Date(booking.bookingDate).toLocaleDateString()}`, 20, 115);
    pdf.text(`Bus: ${booking.bus.operator}`, 20, 130);
    pdf.text(`Seats: ${booking.selectedSeats.map(s => s.number).join(', ')}`, 20, 145);
    pdf.text(`Amount: ₹${booking.totalAmount}`, 20, 160);
    pdf.text(`Status: ${booking.status}`, 20, 175);
    
    // Footer
    pdf.setFontSize(10);
    pdf.text('Thank you for choosing BusYatra!', 20, 200);
    
    pdf.save(`BusYatra-Receipt-${booking.id}.pdf`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in-up">
          <h1 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome back, {user?.name || 'User'}!
          </h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold">{allBookings.length}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{allBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="flex items-center">
                <User className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Active Bookings
                  </p>
                  <p className="text-2xl font-bold">
                    {allBookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className={`rounded-xl shadow-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Your Bookings
            </h2>
            
            {allBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className={`w-16 h-16 mx-auto mb-4 ${
                  isDark ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`text-lg ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No bookings yet. Start your journey today!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allBookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className={`p-6 rounded-lg border transition-all duration-300 hover:scale-102 animate-fade-in-up ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                          <span className={`font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {booking.bus.from} → {booking.bus.to}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Date
                            </p>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Bus
                            </p>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {booking.bus.operator}
                            </p>
                          </div>
                          
                          <div>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Seats
                            </p>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {booking.selectedSeats.map(s => s.number).join(', ')}
                            </p>
                          </div>
                          
                          <div>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Amount
                            </p>
                            <p className={`font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              ₹{booking.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                        
                        <button
                          onClick={() => downloadReceipt(booking)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;