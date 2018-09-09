import { CALCULATE_SAVING } from '../Actions/Types';

const initialState = {
  graphResults: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_SAVING:
      return {
        ...state,
        graphResults: action.payload.data.result
      };
    default:
      return state;
  }
}
