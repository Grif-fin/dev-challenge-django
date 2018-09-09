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
    #pdb.set_trace()
    print(params)
    if initial_deposit is None or interest_rate is None:
        return HttpResponseBadRequest('Required parameters are not provided')

    return JsonResponse({'result' : getGraphResults(initial_deposit, monthly_deposit, interest_rate)})

def getGraphResults(initial_deposit, monthly_deposit, interest_rate):
	result = []
	amount = initial_deposit
	for x in range(1, 51):
		result.append({'month': x, 'amount': amount})
		if monthly_deposit == 0:
			amount = amount + calcGrowth(amount, interest_rate)
		else:
			amount = amount + calcGrowth(amount+monthly_deposit, interest_rate)

	pprint(result)
	return result

def calcGrowth(amount, interest_rate):
	if interest_rate == 0:
		return 0
	else:
		return (interest_rate*(amount))/100.0
