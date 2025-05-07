import React, { useState } from 'react';
import { updateOrderStatus } from '../api/orderService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminOrderItem = ({ order, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800';
      case 'Out for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    
    try {
      await updateOrderStatus(order._id, newStatus, token);
      onStatusUpdate(order._id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order ID: {order._id.substring(0, 8)}...</p>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">User:</span> {order.userId.username}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`mb-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <select
              value={order.status}
              onChange={handleStatusChange}
              disabled={loading}
              className="border border-gray-300 rounded-md text-sm p-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <div>
               
                {item.menuItem ? (
                  <>
                    <p className="text-gray-800">{item.menuItem.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </>
                ) : (
                  <p className="text-red-500">Menu item not available</p>
                )}
              </div>
              <p className="text-gray-800">
                
                {item.menuItem ? (
                  `$${(item.menuItem.price * item.quantity).toFixed(2)}`
                ) : (
                  'N/A' 
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Amount</p>
          <p className="text-lg font-bold text-orange-500">${order.totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderItem;
