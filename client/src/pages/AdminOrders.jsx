import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminOrderItem from '../components/AdminOrderItem';
import { getUserOrders } from '../api/orderService';
import { useAuth } from '../context/AuthContext';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, [token]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filter));
    }
  }, [filter, orders]);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders(token);
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getFilterButtonClass = (status) => {
    return `px-4 py-2 text-sm font-medium rounded-md ${
      filter === status 
        ? 'bg-orange-500 text-white' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Orders</h1>
          <div className="mb-6 flex flex-wrap gap-2">
            {['all', 'Pending', 'Preparing', 'Out for delivery', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={getFilterButtonClass(status)}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <AdminOrderItem 
                  key={order._id} 
                  order={order} 
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-2">No orders found</h2>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'There are no orders in the system yet.' 
                  : `There are no orders with status "${filter}".`}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
