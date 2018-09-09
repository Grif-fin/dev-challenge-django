import request from "axios"

export const calculate = (initialDeposit, monthlyDeposit, interestRate) => {
	return request
		.post("/calculate/", {
			initialDeposit,
			monthlyDeposit,
			interestRate
		})
}
