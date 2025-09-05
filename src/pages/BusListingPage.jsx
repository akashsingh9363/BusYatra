import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Star, Wifi, Coffee, Users, ArrowRight, Calendar } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const BusListingPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('departure');
  const [filterBy, setFilterBy] = useState('all');
  const { searchCriteria, setBookingDetails } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch buses
    const fetchBuses = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockBuses = [
        {
          id: '1',
          operator: 'Express Travels',
          from: searchCriteria?.from || 'Mumbai',
          to: searchCriteria?.to || 'Pune',
          departureTime: '08:00',
          arrivalTime: '12:30',
          duration: '4h 30m',
          price: 450,
          availableSeats: 12,
          totalSeats: 40,
          amenities: ['WiFi', 'AC', 'Charging Port', 'Snacks'],
          busType: 'Luxury',
          rating: 4.5
        },
        {
          id: '2',
          operator: 'Comfort Lines',
          from: searchCriteria?.from || 'Mumbai',
          to: searchCriteria?.to || 'Pune',
          departureTime: '10:15',
          arrivalTime: '15:00',
          duration: '4h 45m',
          price: 380,
          availableSeats: 8,
          totalSeats: 36,
          amenities: ['WiFi', 'AC', 'Charging Port'],
          busType: 'Standard',
          rating: 4.2
        },
        {
          id: '3',
          operator: 'Premium Coach',
          from: searchCriteria?.from || 'Mumbai',
          to: searchCriteria?.to || 'Pune',
          departureTime: '14:30',
          arrivalTime: '18:45',
          duration: '4h 15m',
          price: 520,
          availableSeats: 15,
          totalSeats: 32,
          amenities: ['WiFi', 'AC', 'Charging Port', 'Snacks', 'Entertainment'],
          busType: 'Premium',
          rating: 4.7
        },
        {
          id: '4',
          operator: 'Swift Transit',
          from: searchCriteria?.from || 'Mumbai',
          to: searchCriteria?.to || 'Pune',
          departureTime: '18:45',
          arrivalTime: '23:30',
          duration: '4h 45m',
          price: 420,
          availableSeats: 6,
          totalSeats: 40,
          amenities: ['WiFi', 'AC', 'Charging Port'],
          busType: 'Standard',
          rating: 4.3
        }
      ];
      
      setBuses(mockBuses);
      setLoading(false);
    };

    fetchBuses();
  }, [searchCriteria]);

  const sortedBuses = [...buses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filteredBuses = sortedBuses.filter(bus => {
    switch (filterBy) {
      case 'luxury':
        return bus.busType === 'Luxury' || bus.busType === 'Premium';
      case 'budget':
        return bus.price < 450;
      default:
        return true;
    }
  });

  const handleSelectBus = (bus) => {
    setBookingDetails({ bus });
    navigate(`/seats/${bus.id}`);
  };

  if (!searchCriteria) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Search Criteria Found</h2>
          <p className="text-gray-600 mb-8">Please go back and search for buses</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{searchCriteria.from}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{searchCriteria.to}</span>
              </div>
              <div className="text-gray-500">•</div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-900 dark:text-white">{new Date(searchCriteria.departureDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {filteredBuses.length} buses found
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-fade-in-up animation-delay-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="departure">Departure Time</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="all">All Buses</option>
                  <option value="luxury">Luxury/Premium</option>
                  <option value="budget">Budget (Under ₹450)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bus List */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBuses.map((bus, index) => (
              <div
                key={bus.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:scale-102 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{bus.operator}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">{bus.busType}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{bus.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right lg:hidden">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{bus.price}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">per person</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{bus.departureTime}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{bus.from}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{bus.duration}</div>
                          <div className="h-px bg-gray-300 dark:bg-gray-600 w-16 mx-auto my-1"></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{bus.arrivalTime}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{bus.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {bus.amenities.map((amenity, index) => (
                        <span key={index} className="flex items-center space-x-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                          {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
                          {amenity === 'Snacks' && <Coffee className="h-3 w-3" />}
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-green-600">
                        <Users className="h-4 w-4" />
                        <span>{bus.availableSeats} seats available</span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {bus.totalSeats - bus.availableSeats} already booked
                      </div>
                    </div>
                  </div>

                  <div className="lg:flex lg:flex-col lg:items-end lg:space-y-4 lg:ml-8">
                    <div className="text-right hidden lg:block">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{bus.price}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">per person</div>
                    </div>
                    <button
                      onClick={() => handleSelectBus(bus)}
                      className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium transform hover:scale-105"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">No buses found for your search criteria</div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusListingPage;