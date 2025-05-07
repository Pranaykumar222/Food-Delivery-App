import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

export const placeOrder = async (token) => {
  try {
    const response = await axios.post(BASE_URL, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
