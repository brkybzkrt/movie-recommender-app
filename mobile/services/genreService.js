import axios from 'axios';
import { API_URL } from '../constants/config';

export const getGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch genres');
  }
};
