import React, { Component } from 'react';
import EachStock from './EachStock';

class MyStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myStock1s: []
    };
  }

  handleRemove = stockName => {
    this.props.onStockRemove(stockName);
  };

  render() {
    return (
      <div className='mystocks_div'>
        {this.props.data && <h4 className='yourList'>Your List:</h4>}
        {this.props.data.length > 0 && this.props.data.map((stock, key) => console.log(stock['01. symbol']))}
        <div className='mystocks'>
          {this.props.data.length > 0 &&
            this.props.data.map((stock, key) => (
              <EachStock
                stock={stock['01. symbol']}
                name={stock['01. symbol']}
                price_open={stock['02. open']}
                price={stock['05. price']}
                day_high={stock['03. high']}
                day_low={stock['04. low']}
                change_percent={stock['10. change percent']}
                key={key}
                handleRemove={this.handleRemove}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MyStocks;
