import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

class RFAITabContent extends Component{
  constructor(props){
    super(props);

    this.state = {
      showAmountLabel: false,
      showErrorMsg: false,
      enableButton: false      
    }

    this.handleAGITokenAmt= this.handleAGITokenAmt.bind(this);
  }

  handleAGITokenAmt(e){    
    if(e.target.value != ''){
        this.setState({ 
          enableButton: true ,
          showAmountLabel: true
        })
    } else {
      this.setState({ 
        enableButton: false,
        showAmountLabel: false
      })
    }
  }

  render(){
    return(
      <div className="rfai-tab-content">
        <form>
          <div className="token-amt-container">
            <input type="text" placeholder="AGI Token Amount" onChange={ (e) => {this.handleAGITokenAmt(e)}} />
            {
              this.state.showAmountLabel ?
                <label>Amount</label>
              :
                null
            }            
          </div>
          {
            this.state.showErrorMsg ?
              <label className="error-msg">error state message</label>
            :
              null
          }          
          <Button className={this.state.enableButton ? 'blue' : 'disable'}>{this.props.buttonLabel}</Button>
        </form>
      </div>
    )
  }
}

export default RFAITabContent;