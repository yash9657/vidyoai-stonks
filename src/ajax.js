const apiHost = 'https://www.alphavantage.co/query'
const apikey = '7YPZFR0A5AUXO2MQ'

export default  {
  async fetchStockPrice(val) {
    try {
      const response = await fetch(
        //apiHost + quotePrice + '?symbol=' + val + '&' + apikey
        apiHost + '?function=GLOBAL_QUOTE' + '&symbol=' + val + '&apikey=' + apikey
      );
      const responseJson = await response.json();
      //console.log(responseJson.data);
      // console.log('In Ajax' + responseJson.data[0]['price']);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
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
