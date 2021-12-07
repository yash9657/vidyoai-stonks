const apiHost = 'https://www.alphavantage.co/query'
const apikey = '7YPZFR0A5AUXO2MQ'

const obj =  {
  
  // Returns object of an object having stock details as passed in the symbol
  async fetchStockPrice(val) {
    try {
      const response = await fetch(
        apiHost + '?function=GLOBAL_QUOTE' + '&symbol=' + val + '&apikey=' + apikey
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  // Returns an array of 'bestMatches'
  async fetchSearchStock(val) {
    try {
      const response = await fetch(
        apiHost + '?function=SYMBOL_SEARCH' + '&keywords=' + val + '&apikey=' + apikey
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
};

export default obj;
