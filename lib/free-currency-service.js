require('dotenv').config();
const axios = require('axios');

const api = axios.create({
	baseURL: 'https://free.currconv.com/api/v7',
	timeout: +process.env.TIMEOUT || 5000 
});

module.exports = {
	convertCurrency: async (from, to) => {
		const response = await api.get(`/convert?q=${from}_${to}&compact=y&apiKey=${process.env.FREE_CURR_API_KEY}`);
		const key = Object.keys(response.data)[0];
	    const { val } = response.data[key];
	    return { rate: val };
	}
}