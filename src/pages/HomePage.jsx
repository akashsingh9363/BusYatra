import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const popularRoutes = [
  { from: 'Mumbai', to: 'Pune', price: 450, duration: '3h 30m' },
  { from: 'Delhi', to: 'Jaipur', price: 650, duration: '5h 15m' },
  { from: 'Bangalore', to: 'Chennai', price: 550, duration: '6h 45m' },
  { from: 'Kolkata', to: 'Bhubaneswar', price: 750, duration: '7h 20m' },
  { from: 'Hyderabad', to: 'Vijayawada', price: 400, duration: '4h 10m' },
  { from: 'Ahmedabad', to: 'Udaipur', price: 500, duration: '4h 45m' }
];

const busImages = [
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1098364/pexels-photo-1098364.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const HomePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setSearchCriteria } = useBooking();
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % busImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (from && to && departureDate) {
      setSearchCriteria({ from, to, departureDate });
      navigate('/buses');
    }
  };

  const handleQuickRoute = (route) => {
    setFrom(route.from);
    setTo(route.to);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white overflow-hidden">
        {/* Background Bus Images */}
        <div className="absolute inset-0">
          {busImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Bus ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/80 to-indigo-800/80 dark:from-gray-800/90 dark:via-gray-900/90 dark:to-black/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Your Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Book comfortable, safe, and reliable bus tickets across India with ease
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Departure city"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
             bg-white text-gray-900 dark:bg-gray-700 dark:text-white 
             rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Destination city"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
           bg-white text-gray-900 dark:bg-gray-700 dark:text-white 
           rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
           bg-white text-gray-900 dark:bg-gray-700 dark:text-white 
           rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 font-medium transform hover:scale-105"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Buses</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Popular Routes</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Discover our most traveled routes with the best prices and comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                onClick={() => handleQuickRoute(route)}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group p-6 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{route.from}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{route.to}</div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{route.price}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Starting from • {route.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">Why Choose BusYatra?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in-up animation-delay-200">Experience the best in bus travel across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-up animation-delay-300">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all duration-300 transform group-hover:scale-110">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">Simple and intuitive booking process with real-time seat selection</p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-400">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-all duration-300 transform group-hover:scale-110">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Wide Network</h3>
              <p className="text-gray-600 dark:text-gray-300">Extensive network covering major cities and routes across India</p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-500">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-all duration-300 transform group-hover:scale-110">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Safe & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Secure payment gateway and verified bus operators for your safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Cities Connected</div>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm md:text-base opacity-90">Daily Trips</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-3xl md:text-4xl font-bold mb-2">10L+</div>
              <div className="text-sm md:text-base opacity-90">Happy Customers</div>
            </div>
            <div className="animate-fade-in-up animation-delay-500">
              <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-sm md:text-base opacity-90">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;