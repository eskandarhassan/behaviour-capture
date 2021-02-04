from django.contrib import admin
from .models import Behaviour


@admin.register(Behaviour)
class BehaviourAdmin(admin.ModelAdmin):
    list_display = ["title", "ip_address",
                    "operating_system", "button_click", "time", "browser"]
