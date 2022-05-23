import axios from "axios";

export default axios.create({
    // change when API ready to integrate
    baseURL: 'http://localhost:3000'
})