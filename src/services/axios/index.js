import axios from "axios";

export default axios.create({
    // change when API ready to integrate
    baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8000',
})