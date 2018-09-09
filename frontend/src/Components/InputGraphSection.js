import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateSaving } from '../Actions/Calculate';

class InputGraphSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDeposit: 1000,
      monthlyDeposit: 500,
      interestRate: 4,
      interestRateInterval: "annually"
    };

    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.calculateSavings()
  }

  calculateSavings(){
      this.props.calculateSaving( this.state.initialDeposit,
                                  this.state.monthlyDeposit,
                                  this.state.interestRate,
                                  this.state.interestRateInterval );
  }

  onInputChanged(id, value){
    if(!isNaN(value)){
      this.setState({ [id]: value }, function () {
        this.calculateSavings()
      });
    }
  }

  onSelectChanged(e){
    this.setState({interestRateInterval: e.target.value}, function () {
      this.calculateSavings()
    });
  }

  render() {
    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput defaultValue={this.state.initialDeposit} id='initialDeposit' onFieldChange={this.onInputChanged}/>

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput defaultValue={this.state.monthlyDeposit} id='monthlyDeposit' onFieldChange={this.onInputChanged}/>

          <p className="input-label">
            How much interest will you earn&nbsp; 
            <select id='interestRateInterval' onChange={this.onSelectChanged}>
              <option value="annually">annually</option>
              <option value="quarterly">quarterly</option>
              <option value="monthly">monthly</option>
            </select>&nbsp;?
          </p>
          <SliderInput defaultValue={this.state.interestRate} id='interestRate' onFieldChange={this.onInputChanged}/>
        </div>
        <div className="financial-display center" style={{maxWidth:750}}>
          <DisplayGraph
            data={this.props.graphResults}
          />
        </div>
      </div>
    )
  }
}

InputGraphSection.propTypes = {
  onInputChanged: PropTypes.func,
  calculateSaving: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  graphResults: state.calculate.graphResults
});

export default connect(mapStateToProps, { calculateSaving })(InputGraphSection);
