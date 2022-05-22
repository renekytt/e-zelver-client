export const BASE_URL = 'https://e-zelver-api.herokuapp.com' // https://e-zelver-api.herokuapp.com

export const config = () => (
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
);
