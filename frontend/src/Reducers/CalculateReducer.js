import { CALCULATE_SAVING } from '../Actions/Types';

const initialState = {
  calculatedSavings: {}
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
