import { combineReducers } from 'redux';
import CalculateReducer from './CalculateReducer';

export default combineReducers({
  calculate: CalculateReducer
});
