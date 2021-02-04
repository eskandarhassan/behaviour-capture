from django.shortcuts import render
from django.views.generic.base import TemplateView, View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import httpagentparser
import json

from .models import Behaviour


class HomeView(TemplateView):
    template_name = "index.html"


class BehaviourView(View):

    def post(self, request, *args, **kwargs):

        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        operating_system = httpagentparser.detect(user_agent)["os"].get('name')
        browser = httpagentparser.detect(
            user_agent)["browser"].get('name')
        post_data = json.loads(request.body)

        if float(post_data.get('button_spent')) > 0:
            button_click = True
        else:
            button_click = False

        Behaviour.objects.create(title=post_data.get(
            'title'), ip_address=ip_address, button_click=button_click,
            time=post_data.get('time_spent'), operating_system=operating_system,
            browser=browser)

        return JsonResponse({})

    @ method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(BehaviourView, self).dispatch(*args, **kwargs)
