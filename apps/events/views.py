# Django
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Decorators
# Models
from django.contrib.auth.models import User
# Forms
# View functions
# Misc
from django.templatetags.static import static
# Python
import os

def events (request):
    eventspage = True
     
    # Get all event details
    event_category = 'Event'
    eventdet_list = EventDetails.objects.filter(category = event_category).filter(is_visible = True)
    
    return render_to_response('pages/events.html', locals(), context_instance= global_context(request))

def projects(request):
    projectspage = True
    
    # Get all project details
    project_category = 'Project'
    projectdet_list = EventDetails.objects.filter(category = project_category).filter(is_visible = True)
    
    return render_to_response('pages/projects.html', locals(), context_instance= global_context(request))
