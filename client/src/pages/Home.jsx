import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Clock, Truck, ThumbsUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center md:text-left md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious Food, Delivered Fast
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Enjoy your favorite meals with just a few clicks. Hot, fresh, and right to your doorstep.
              </p>
              <div className="space-x-4">
                <Link
                  to="/menu"
                  className="inline-block px-6 py-3 bg-white text-orange-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition duration-300"
                >
                  Browse Menu
                </Link>
                {!user ? (
                  <Link
                    to="/register"
                    className="inline-block px-6 py-3 bg-orange-700 text-white font-medium rounded-md shadow-md hover:bg-orange-800 transition duration-300"
                  >
                    Sign Up
                  </Link>
                ) : (
                  <Link
                    to={user.role === 'admin' ? '/admin/menu' : '/menu'}
                    className="inline-block px-6 py-3 bg-orange-700 text-white font-medium rounded-md shadow-md hover:bg-orange-800 transition duration-300"
                  >
                    Order Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose <span className="text-orange-500">FoodDelivery</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-500 rounded-full mb-4">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Food</h3>
                <p className="text-gray-600">
                  Fresh ingredients, expertly prepared by our partner restaurants.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-500 rounded-full mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600">
                  From kitchen to your table in under 30 minutes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-500 rounded-full mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Tracking</h3>
                <p className="text-gray-600">
                  Know exactly where your order is at every step.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-500 rounded-full mb-4">
                  <ThumbsUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Satisfaction</h3>
                <p className="text-gray-600">
                  Not happy with your meal? We'll make it right.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-orange-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Ready to Order?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Browse our menu and discover your new favorite dishes. Fast delivery, easy payment, and delicious food all in one place.
                </p>
                <Link
                  to={user ? (user.role === 'admin' ? '/admin/menu' : '/menu') : '/register'}
                  className="inline-block px-8 py-3 bg-orange-500 text-white font-medium rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                >
                  {user ? 'Order Now' : 'Sign Up'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
