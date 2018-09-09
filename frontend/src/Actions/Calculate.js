import { CALCULATE_SAVING } from './Types';
import request from "axios"

export const calculateSaving = (initialDeposit, monthlyDeposit, interestRate, interestRateInterval) => dispatch => {
	request
		.post("/calculate/", {
			initialDeposit,
			monthlyDeposit,
			interestRate,
			interestRateInterval
		})
		    .then(resp =>
		      dispatch({
		        type: CALCULATE_SAVING,
		        payload: resp
		      })
		    );
};
