import axios from 'axios';

// const BASEURL = 'http://localhost:5000';
// const BASEURL = 'http://121.41.45.147:5000'; 
const BASEURL = '/apis'; 

export const reqUpload = (data) => {
  return new Promise((resolve, reject) => {
    const promise = axios.post(BASEURL + '/upload/img', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    //等待请求的结果返回
    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error.message);
    })
  })
}

export const reqMulUpload = (array) => {
  return new Promise((resolve, reject) => {
    const promise = axios.post(BASEURL + '/upload/imgs', array, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    //等待请求的结果返回
    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error.message);
    })
  })
}