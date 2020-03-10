from django.shortcuts import render
from django.http import HttpResponse
import os
import json

from TrafficDisplayer.settings import BASE_DIR


def home(request):
    return HttpResponse('Hello, World!')


def data(request):
    path = os.path.join(BASE_DIR, "static/traffic_data.json")
    with open(path, 'r') as myfile:
        data = myfile.read()
    response = HttpResponse(json.dumps(dict(success=True, result=dict(journeys=json.loads(data)))))
    response['Content-Type'] = 'application/json'
    return response
