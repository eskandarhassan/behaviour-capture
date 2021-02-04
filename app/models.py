from django.db import models


class Behaviour(models.Model):
    title = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField()
    button_click = models.BooleanField(default=False)
    time = models.FloatField()
    operating_system = models.CharField(max_length=100)
    browser = models.CharField(max_length=100)

    def __str__(self):
        return self.ip_address
