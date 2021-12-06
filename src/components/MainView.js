import React, { Component } from 'react';
import Search from './Search';
import MyStocks from './MyStocks';
import ajax from '../ajax';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [],
      data: []
    };
  }

  onStockAddHandler = stockName => {
    this.setState(
      {
        stockList: [...this.state.stockList, stockName]
      },
      async () => {
        const value = await ajax.fetchStockPrice(stockName);
        let arr = [];
        arr.push(value['Global Quote'])
        //console.log(arr)
        //console.log(value['Global Quote']['01. symbol'])
        this.setState({
          data: arr
        });
      }
    );
  };

  

  onStockRemoveHandler = stockName => {
    const currState = [...this.state.stockList];
    var index = this.state.stockList.indexOf(stockName);
    if (index !== -1) {
      currState.splice(index, 1);
      this.setState(
        {
          stockList: currState
        },
        async () => {
          const value = await ajax.fetchStockPrice(stockName);
          let arr = [];
          arr.push(value['Global Quote'])
          this.setState({
            data: arr
          });
        }
      );
    }
  };

  render() {
    return (
      <div className='mainview container'>
        <Search
          onStockAdd={this.onStockAddHandler}
          stockList={this.state.stockList}
          onStockRemove={this.onStockRemoveHandler}
        />
        <MyStocks
          onStockRemove={this.onStockRemoveHandler}
          data={this.state.data}
          myStocks={this.state.stockList}
        />
      </div>
    );
  }
}

export default MainView;
