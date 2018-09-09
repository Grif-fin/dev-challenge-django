from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
import pdb

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

    return JsonResponse({'result': 1000})