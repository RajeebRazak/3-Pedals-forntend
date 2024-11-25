import axios from 'axios';
import _ from 'lodash';

export const fetchSuggestions = _.debounce(async (query, setSuggestions, setLoading) => {
  if (query.length < 2) {
    setSuggestions([]);
    return;
  }
  setLoading(true);
  try {
    const response = await axios.get('http://localhost:3000/api/vehicles/search', {
      params: { query }
    });
    setSuggestions(response.data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  } finally {
    setLoading(false);
  }
}, 300); // 300ms delay
