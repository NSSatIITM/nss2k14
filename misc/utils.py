# Django
from django.template.context import Context, RequestContext
from django.shortcuts import HttpResponseRedirect, resolve_url
from django.core.urlresolvers import reverse,resolve
from django.contrib import messages
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.utils.encoding import force_str
# Decorators
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Models
from django.db import models
from django.contrib.auth.models import User, Group
from apps.accounts.models import UserProfile, USERTYPE_CHOICES, HOSTEL_CHOICES, GENDER_CHOICES
from apps.events.models import Event
# Forms
# View functions
# Misc
# Python
from functools import wraps
import datetime

# ------------------ TEMPLATE CUSTOMIZATIONS
#----------------------------------------------------------------------
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

# ------------------ FORM CUSTOMIZATIONS
#----------------------------------------------------------------------
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

# ------------------ VALIDITY CHECKS
#----------------------------------------------------------------------
def valid_phone_number(num_string):
    """
        Takes a phone number string and checs if the thing is a valid phone number.
        Returns True or False
    """
    data = "".join(num_string.split()).replace("+", "")
    return data.isdigit() and len(data) >= 10 and len(data) <= 13 


# ------------------ DB POPULATIONS
#----------------------------------------------------------------------
def populate_test_data(MAX_USERS = 20, MAX_EVENTS = 5, MAX_PROJECTS = 5):
    """
        Populates the Database with some temporary test data
        ONLY meant for testing out !
    """
    # USERS
    for i in xrange(MAX_USERS):
        # Create data
        roll_no = "AA00BA0" + str(i).zfill(2)
        roll_no = roll_no.lower()
        roll_no_email = roll_no + "@smail.iitm.ac.in"
        roll_no_email = roll_no_email.lower()
        
        # Create user
        if User.objects.filter(username = roll_no).count() == 0:
            user = User.objects.create(roll_no, roll_no_email, roll_no) # id, email, passwd
        else:
            user = User.objects.get(username = roll_no) # id, email, passwd
            print "User " + roll_no + "already existing, using the one which is existing"
        user.save()
        
        if UserProfile.objects.filter(user = user) == 0:
            userprofile = UserProfile.objects.create()
        else:
            userprofile = UserProfile.objects.get(user = user)
            print "Userprofile for User " + roll_no + " already existing, using the one which is existing"
            
        userprofile.roll_no = roll_no
        userprofile.user = user
        userprofile.phone_number = "10000000" + str(i).zfill(2)
        userprofile.gender = GENDER_CHOICES[int( 1.0 * i * (len(GENDER_CHOICES)-1) / MAX_USERS )]
        userprofile.hostel = HOSTEL_CHOICES[int( 1.0 * i * (len(HOSTEL_CHOICES)-1) / MAX_USERS )]
        userprofile.room_no = str(i).zfill(3)
        userprofile.usertype = USERTYPE_CHOICES[int( 1.0 * i * (len(USERTYPE_CHOICES)-1) / MAX_USERS )]
        userprofile.save()
    # EVENTS    
    for i in xrange(MAX_EVENTS):
        event_name = "EVENT_" + str(i).zfill(2)
        event_desc = ( "event _ " + str(i).zfill(2) + " . " ) * 50
        
        if Event.objects.filter(name = event_name) == 0:
            event = Event.objects.create()
        else:
            event = Event.objects.get(name = event_name)
            print "Event " + event_name + " already existing, using the one which is existing"
        
        event.name = event_name
        event.date = datetime.datetime.now()
        event.category = 'DOS'
        event.descrption = event_desc
        event.save()
    # PROJECTS  
    for i in xrange(MAX_PROJECTS):
        proj_name = "PROJECT_" + str(i).zfill(2)
        proj_desc = ( "proj _ " + str(i).zfill(2) + " . " ) * 50
        
        if Event.objects.filter(name = proj_name) == 0:
            proj = Event.objects.create()
        else:
            proj = Event.objects.get(name = proj_name)
            print "Proj " + proj_name + " already existing, using the one which is existing"
        
        proj.name = proj_name
        proj.date = datetime.datetime.now()
        proj.category = 'Project'
        proj.descrption = proj_desc
        proj.save()
    # 
