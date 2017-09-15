import axios from 'axios'

let baseUrl = '/api/';
let getData = (url) => axios.get(baseUrl + url);
export {
  getData
}
