import { CALCULATE_SAVING } from './Types';
import request from "axios"

export const calculateSaving = (initialDeposit, monthlyDeposit, interestRate) => dispatch => {
	request
		.post("/calculate/", {
			initialDeposit,
			monthlyDeposit,
			interestRate
		})
		    .then(resp =>
		      dispatch({
		        type: CALCULATE_SAVING,
		        payload: resp
		      })
		    );
};
