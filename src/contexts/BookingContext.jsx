import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [bookingDetails, setBookingDetailsState] = useState({
    bus: null,
    selectedSeats: [],
    passengers: [],
    totalAmount: 0
  });

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      try {
        setAllBookings(JSON.parse(savedBookings));
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    }
  }, []);

  // Save bookings to localStorage whenever allBookings changes
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(allBookings));
  }, [allBookings]);

  const setBookingDetails = (details) => {
    setBookingDetailsState(prev => ({
      ...prev,
      ...details
    }));
  };

  const addBooking = (booking) => {
    setAllBookings(prev => [...prev, booking]);
  };

  const clearBooking = () => {
    setBookingDetailsState({
      bus: null,
      selectedSeats: [],
      passengers: [],
      totalAmount: 0
    });
  };

  const value = {
    searchCriteria,
    setSearchCriteria,
    bookingDetails,
    setBookingDetails,
    allBookings,
    addBooking,
    clearBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};