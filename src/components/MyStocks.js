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
        <div className='mystocks'>
          {this.props.data &&
            this.props.data.map((stock, key) => (
              <EachStock
                stock={stock[0]['01. symbol']}
                name={stock[0]['01. symbol']}
                price_open={stock[0]['02. open']}
                price={stock[0]['05. price']}
                day_high={stock[0]['03. high']}
                day_low={stock[0]['04. low']}
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
