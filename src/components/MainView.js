import React, { Component } from 'react';
import Search from './Search';
import MyStocks from './MyStocks';
import ajax from '../ajax';

class MainView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      stockList: [],
      data: [],
      arr: []
    };
  }
  
  onStockAddHandler = stockName => {
    this.setState(
      {
        stockList: [...this.state.stockList, stockName]
      },
      
      async () => {
        
        const value = await ajax.fetchStockPrice(stockName);
        this.state.arr.push(value['Global Quote'])
        console.log(this.state.arr)
        //console.log(this.state.arr);
        //this.state.data.push(value['Global Quote']);
        //console.log(value['Global Quote']['01. symbol'])
        this.setState({
          data: this.state.arr
        });
      }
    );
  };

  

  onStockRemoveHandler = stockName => {
    const currState = [...this.state.stockList];
    //console.log(currState);
    var index = this.state.stockList.indexOf(stockName);
    if (index !== -1) {
      currState.splice(index, 1);
      this.setState(
        {
          stockList: currState
        },
        
        async () => {
          const value = await ajax.fetchStockPrice(stockName);
          var i = this.state.data.indexOf(stockName);
          console.log(this.state.data);
          
          this.state.data.splice(i, 1);
          this.setState({
            data: this.state.data
          })
          console.log(this.state.data);
          
          // let arr = [];
          // arr.push(value['Global Quote'])
          // this.setState({
          //   data: this.state.data.pop[value['Global Quote']]
          // });
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
