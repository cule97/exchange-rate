import axios from 'axios';

export const getExchangeRate = async (nation:string,base:string) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/87a08a264002b589fa611d61/latest/${nation}`);
    const conversionRates=await response.data.conversion_rates[base]
    return conversionRates
    
  } catch (err) {
    console.log('Error >>', err);
  }
};