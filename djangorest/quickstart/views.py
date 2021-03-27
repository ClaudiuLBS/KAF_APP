from django.shortcuts import render
from rest_framework import viewsets, views
from .serializers import ConsumerSerializer
from .models import Consumer
from django.http import HttpResponseRedirect


class ConsumerViewSet(viewsets.ModelViewSet):
    queryset = Consumer.objects.all()
    serializer_class = ConsumerSerializer


def Index(request):
    if request.method == 'POST':
        code = request.POST['code']
        consumer_id = int(code) - 137584

        try:
            x = Consumer.objects.get(id=consumer_id)
            return HttpResponseRedirect(str(consumer_id))
        except:
            print('dont tuch my nono square')


    return render(request, 'main/index.html', {})

def Client(request, id):
    x = Consumer.objects.get(id=id)

    if request.method == 'POST':
        if int(request.POST['add']) > 0:
            x.silver += int(request.POST['add'])
        else:
            x.gold += int(request.POST['add'])
        x.save()
        return HttpResponseRedirect('http://127.0.0.1:8000/kaf/')

    return render(request, 'main/client.html', {'client': x})