#Utilities
#Import stuff.
from django.template.context import Context, RequestContext
from django.shortcuts import HttpResponseRedirect
import nss.settings as settings
from django.core.urlresolvers import reverse,resolve

from django.contrib import messages
from django.contrib.auth import REDIRECT_FIELD_NAME
from functools import wraps
from django.utils.decorators import available_attrs
from django.utils.encoding import force_str
from django.shortcuts import resolve_url
from django.db import models
try:
    from urllib.parse import urlparse
except ImportError:     # Python 2
    from urlparse import urlparse

# Generates a context with the most used variables
def global_context(request):
    """
        Some basic variables useful in templates
    """
    context =  RequestContext (request,
            {'user':request.user,
            'SITE_URL':settings.SITE_URL,
            'MEDIA_URL':settings.MEDIA_URL,
            'MEDIA_ROOT':settings.MEDIA_ROOT,
            'STATIC_ROOT':settings.STATIC_ROOT,
            'STATIC_URL':settings.STATIC_URL,
            'DEBUG':settings.DEBUG,
            'SETTINGS':settings,
            })
    return context

def get_or_create_user_profile(user):
    """
        Gets the user profile, if not existing, it will create and return
        the user profile WITHOUT saving
    """
    profile = None
    try:
        profile = user.get_profile()
    except:
        #Simply return an instance. DO NOT SAVE IT INTO THE DATABASE.
        #Using UserProfile.objects.create(user = user) would save it into the db.
        #We want it to be saved only when they save the profile form at least once.
        profile = UserProfile(user = user)
    return profile

def make_custom_datefield(f, **kwargs):
    """
        This makes it easy for datepickr fron jquery to be added to a django form
        Just add :
            formfield_callback = make_custom_datefield
        inside the form
    """
    formfield = f.formfield(**kwargs)
    if isinstance(f, models.DateField):
        #print formfield
        formfield.widget.format = '%m/%d/%Y'
        formfield.widget.attrs.update({'class':'datePicker'})#, 'readonly':'true'})
    return formfield

def valid_phone_number(num_string):
    """
        Takes a phone number string and checs if the thing is a valid phone number.
        Returns True or False
    """
    data = "".join(num_string.split()).replace("+", "")
    return data.isdigit() and len(data) >= 10 and len(data) <= 13 
        
