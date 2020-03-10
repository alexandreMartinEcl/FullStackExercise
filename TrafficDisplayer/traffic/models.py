from django.db import models


class Journey(models.Model):
    report_period = models.DateTimeField(null=False)
    terminal = models.CharField(max_length=100, null=False)
    arrival_departure = models.CharField(max_length=9, null=False)
    domestic_international = models.CharField(max_length=13, null=False)
    passenger_count = models.BigIntegerField(null=False)
