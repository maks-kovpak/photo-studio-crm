import { default as originalAxios } from 'axios';
import { notification } from 'antd';

const axios = originalAxios.create({
  baseURL: '/api',
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { errorMessage } = error.response.data;

    notification.error({
      message: errorMessage,
    });

    return Promise.reject(error);
  }
);

export default axios;
