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
from apps.events.models import Event, EventInstance, Credit
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
    event_list = Event.objects.filter(category = event_category).filter(is_visible = True)
    
    return render_to_response('pages/events.html', locals(), context_instance= global_context(request))

def projects(request):
    projectspage = True
    
    # Get all project details
    project_category = 'Project'
    project_list = Event.objects.filter(category = project_category).filter(is_visible = True)
    
    return render_to_response('pages/projects.html', locals(), context_instance= global_context(request))
    
def winterns(request):
    winternspage = True
    
    # Get all project details
    wintern_category = 'Wintern'
    wintern_list = Event.objects.filter(category = wintern_category).filter(is_visible = True)
    
    return render_to_response('pages/winterns.html', locals(), context_instance= global_context(request))
    
# To display event and evnet_instances - have to discuss about accessibility to vol and not logged in people (as of now no difference)       
def display_events(request, event_id = None, user_id = None):

	if event_id is None:
		raise Http404
	event = None
	
	try:
		event = Event.objects.get(pk = int(event_id))
	except Event.DoesNotExist:
		raise Http404
		
	context = {
        'event' : event,
        'instances' : event.instances.all(),
        'can_edit' : False,
        'logged_in' : False,
       
        }
	return render_to_response('modules/events/event_details.html', context, context_instance = RequestContext(request))

def display_instance(request, instance_id = None, user_id = None):

	if instance_id is None:
		raise Http404
	instance = None
	
	try:
		instance = EventInstance.objects.get(pk = int(instance_id))
	except EventInstance.DoesNotExist:
		raise Http404
	
	context = {
        'instance' : instance,
        'can_edit' : False,
        'logged_in' : False,
        
        }
	return render_to_response('modules/events/instance_details.html', context, context_instance = RequestContext(request))

