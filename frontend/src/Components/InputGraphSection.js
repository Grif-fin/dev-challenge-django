import React, { Component } from "react"
import { calculate } from "./../API"
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
      initialDeposit: 0,
      monthlyDeposit: 0,
      interestRate: 4,
      interestRateInterval: "monthly"
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
    this.setState({ [id]: value }, function () {
      this.calculateSavings()
    });
  }

  onSelectChanged(e){
    this.setState({interestRateInterval: e.target.value}, function () {
      this.calculateSavings()
    });
  }

  render() {
    const { result } = this.props
    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput defaultValue={0} id='initialDeposit' onFieldChange={this.onInputChanged}/>

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput defaultValue={0} id='monthlyDeposit' onFieldChange={this.onInputChanged}/>

          <p className="input-label">
            How much interest will you earn&nbsp; 
            <select id='interestRateInterval' onChange={this.onSelectChanged}>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="annually">annually</option>
            </select>&nbsp;?
          </p>
          <SliderInput defaultValue={4} id='interestRate' onFieldChange={this.onInputChanged}/>
        </div>
        <div className="financial-display center" style={{maxWidth:750}}>
          {/*We have included some sample data here, you will need to replace this
            with your own. Feel free to change the data structure if you wish.*/}
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
