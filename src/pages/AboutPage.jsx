import React from 'react';
import { Bus, Users, Shield, Award, MapPin, Clock } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Bus, label: 'Buses', value: '5000+' },
    { icon: Users, label: 'Happy Customers', value: '10L+' },
    { icon: MapPin, label: 'Cities Connected', value: '200+' },
    { icon: Clock, label: 'Years of Service', value: '15+' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your safety is our priority. All our buses are regularly maintained and drivers are verified.'
    },
    {
      icon: Award,
      title: 'Award Winning Service',
      description: 'Recognized as the best bus booking platform in India with multiple industry awards.'
    },
    {
      icon: Users,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available round the clock to assist you with any queries.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About BusYatra</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Connecting India, one journey at a time. Your trusted partner for comfortable and safe bus travel.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2009, BusYatra started with a simple mission: to make bus travel in India more convenient, 
                comfortable, and accessible for everyone. What began as a small startup has now grown into India's 
                leading bus booking platform.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We've revolutionized the way people book bus tickets by providing a seamless online platform that 
                connects travelers with reliable bus operators across the country. Our technology-driven approach 
                ensures transparency, convenience, and the best travel experience.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Today, we're proud to serve millions of customers annually, connecting over 200 cities with our 
                extensive network of trusted bus operators.
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <img
                src="https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bus Travel"
                className="rounded-lg shadow-xl w-full h-96 object-cover transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best bus booking experience with our innovative features and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              To transform bus travel in India by providing a reliable, convenient, and technology-driven platform 
              that connects travelers with the best bus operators, ensuring safe, comfortable, and affordable journeys 
              for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;