import { CALCULATE_SAVING } from '../Actions/Types';

const initialState = {
  initialDeposit : 0,
  monthlyDeposit : 0,
  interestRate : 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_SAVING:
      return {
        ...state,
        calculatedSavings: action.payload
      };
    default:
      return state;
  }
}
