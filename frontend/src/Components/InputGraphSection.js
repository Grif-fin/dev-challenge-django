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
      interestRate: 0
    };

    this.onInputChanged = this.onInputChanged.bind(this);
  }


  onInputChanged(id, value){
    this.setState({ [id]: value }, function () {
      this.props.calculateSaving( this.state.initialDeposit,
                                  this.state.monthlyDeposit,
                                  this.state.interestRate );
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
            How much interest will you earn per year?
          </p>
          <SliderInput defaultValue={4} id='interestRate' onFieldChange={this.onInputChanged}/>
        </div>
        <div className="financial-display">
          {/*We have included some sample data here, you will need to replace this
            with your own. Feel free to change the data structure if you wish.*/}
          <DisplayGraph
            data={[
              {
                month: 1,
                amount: 500
              },
              {
                month: 2,
                amount: 700
              },
              {
                month: 3,
                amount: 1000
              },
              {
                month: 6,
                amount: 1800
              }
            ]}
          />
        </div>
      </div>
    )
  }
}

InputGraphSection.propTypes = {
  onInputChanged: PropTypes.func,
  calculateSaving: PropTypes.func.isRequired,
  calculatedData: PropTypes.object
}

const mapStateToProps = state => ({
  calculatedSavings: state.calculate.calculatedSavings
});

export default connect(mapStateToProps, { calculateSaving })(InputGraphSection);
