import React, { Component } from 'react';
import ajax from '../ajax';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStock: '',
      searchedStocks: [],
      stocks: []
    };
  }

  handleChange = async e => {
    this.setState(
      {
        searchStock: e.target.value
      },
      async () => {
        if (this.state.searchStock) {
          const value = await ajax.fetchSearchStock(this.state.searchStock);
          if (value != null) {
            //console.log(value)
            this.setState({
              searchedStocks: value['bestMatches'].slice(0, 3)
            });
            var stonks = [];
            for(var i = 0; i < this.state.searchedStocks.length; i++) {
              var temp = await ajax.fetchStockPrice(this.state.searchedStocks[i]['1. symbol']);
              //console.log(temp['Global Quote'])
              if(temp['Global Quote'] !== undefined){stonks.push(temp['Global Quote']['05. price']);}
                
            }
            //console.log(stonks[0]['05. price'])
            this.setState({
              stocks: stonks
            })
            //const stcks = await ajax.fetchStockPrice(this.state.searchedStocks[0]['1. symbol'])
            //console.log(stonks);
          } else {
            console.log(value);
          }
        } else {
          this.setState({
            searchedStocks: null
          });
        }
      },
      
      
      // async () => {
        

      //   // const obj = await ajax.fetchStockPrice(stocks[0]['1. symbol'])
      //   // console.log(obj);
      // }
    );
  };

  onAddButtonClick = stock => {
    var temp = stock;
    //console.log(temp);
    this.props.onStockAdd(temp);
  };

  render() {
    const stocks =
      this.state.searchedStocks !== null
        ? this.state.searchedStocks.map((stock, key) => (
            <div className='card eachSuggestion' key={key}>
              <div className='card-body'>
                <h5 className='card-title'>{stock['1. symbol']}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>
                  {stock['2. name']}
                </h6>
                <p className='card-text'>${this.state.stocks[key]}</p>
                {this.props.stockList.includes(stock['1. symbol']) ? (
                  <button
                    href='#'
                    className='btn-outline-primary'
                    disabled
                    onClick={() => this.onAddButtonClick(stock['1. symbol'])}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    href='#'
                    className='card-link addButton btn-primary btn-block'
                    onClick={() => this.onAddButtonClick(stock['1. symbol'])}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))
        : '';
    return (
      <div className='search'>
        <div className='input-group input-group-lg'>
          <input
            type='search'
            placeholder='Search by typing the Symbol (E.g. AAPL, MSFT, LYFT...)'
            className='form-control input-group-lg searchBar'
            value={this.state.searchStock}
            onChange={this.handleChange}
          />
        </div>

        <div className='suggestedStocks'>{stocks}</div>
      </div>
    );
  }
}

export default Search;
