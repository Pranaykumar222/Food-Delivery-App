import React from 'react';

const OrderItem = ({ order }) => {

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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; 

    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order ID: {order._id ? order._id.substring(0, 8) : 'N/A'}...</p>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status || 'N/A'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
        {order.items && order.items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <div>
                  <p className="text-gray-800">{item.menuItem ? item.menuItem.name : 'N/A'}</p>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity || 'N/A'}</p>
                </div>
                <p className="text-gray-800">
                  ${item.menuItem && item.menuItem.price && item.quantity ? (item.menuItem.price * item.quantity).toFixed(2) : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items available</p>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Amount</p>
          <p className="text-lg font-bold text-orange-500">
            {order.totalAmount ? `$${order.totalAmount.toFixed(2)}` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
