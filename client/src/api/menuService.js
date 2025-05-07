import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/menu`;

export const getMenu = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addMenuItem = async (menuItem, token) => {
  try {
    const response = await axios.post(BASE_URL, menuItem, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (id, menuItem, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, menuItem, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
