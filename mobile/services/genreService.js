import axios from 'axios';
import { API_URL, API_URL_LOCAL } from '../constants/config';

export const getGenres = async () => {
  try {
    const response = await axios.get(`${API_URL_LOCAL}/genres`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch genres');
  }
};
