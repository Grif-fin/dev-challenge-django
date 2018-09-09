from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
import pdb
from pprint import pprint

@require_POST
@csrf_exempt
def calculate(request):
    params = json.loads(request.body.decode('utf-8'))
    initial_deposit = params.get('initialDeposit', None)
    monthly_deposit = params.get('monthlyDeposit', None)
    interest_rate = params.get('interestRate', None)
    interest_rate_interval = params.get('interestRateInterval', None)
    #pdb.set_trace()
    print(params)
    if initial_deposit is None or interest_rate is None:
        return HttpResponseBadRequest('Required parameters are not provided')

    return JsonResponse({'result' : getGraphResults(initial_deposit, monthly_deposit, interest_rate, interest_rate_interval)})

def getGraphResults(initial_deposit, monthly_deposit, interest_rate, interest_rate_interval):
	result = []
	amount = initial_deposit
	interest_rate_interval_mod = 1
	if interest_rate_interval == "quarterly":
		interest_rate_interval_mod = 4
	elif interest_rate_interval == "annually":
		interest_rate_interval_mod = 12

	for month_num in range(1, 51):
		result.append({'month': month_num, 'amount': amount})
		month_interest_rate = interest_rate
		if (month_num % interest_rate_interval_mod) != 0:
			month_interest_rate = 0

		amount = amount + calcGrowth(amount+monthly_deposit, month_interest_rate)

	pprint(result)
	return result

def calcGrowth(amount, interest_rate):
	if interest_rate == 0:
		return 0
	else:
		return (interest_rate*(amount))/100.0
