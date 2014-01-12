# Django
from django.template.context import Context, RequestContext
from django.shortcuts import HttpResponseRedirect, resolve_url
from django.core.urlresolvers import reverse,resolve
from django.contrib import messages
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.utils.encoding import force_str
from django.utils.timezone import utc
# Decorators
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Models
from django.db import models
from django.contrib.auth.models import User, Group
from apps.accounts.models import UserProfile
from apps.accounts.models import USERTYPE_CHOICES, HOSTEL_CHOICES, GENDER_CHOICES
from apps.events.models import EventDetails, Event, Credit
from apps.events.models import EVENT_CATEGORY_CHOICES
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
def populate_test_data(MAX_USERS = 20, MAX_EVENT_DETAILS = 10, MAX_EVENTS = 4):
    """
        Populates the Database with some temporary test data
        ONLY meant for testing out !
    """
    # USERS
    for i in xrange(MAX_USERS):
        # Create data
        roll_no = "AA00A0" + str(i).zfill(2)
        roll_no = roll_no.lower()
        roll_no_email = roll_no + "@smail.iitm.ac.in"
        roll_no_email = roll_no_email.lower()
        
        # Create user
        if User.objects.filter(username = roll_no).count() == 0:
            user = User.objects.create_user(roll_no, roll_no_email, roll_no) # id, email, passwd
        else:
            user = User.objects.get(username = roll_no) # id, email, passwd
            print " > User " + roll_no + " already existing, using the one which is existing"
        user.save()
        
        if UserProfile.objects.filter(user = user).count() == 0:
            userprofile = UserProfile.objects.create(user = user)
        else:
            userprofile = UserProfile.objects.get(user = user)
            print " > Userprofile for User " + roll_no + " already existing, using the one which is existing"
        
        userprofile.roll_no = roll_no
        userprofile.phone_number = "10000000" + str(i).zfill(2)
        userprofile.gender = GENDER_CHOICES[int( 1.0 * i * len(GENDER_CHOICES) / MAX_USERS )][0]
        userprofile.hostel = HOSTEL_CHOICES[int( 1.0 * i * len(HOSTEL_CHOICES) / MAX_USERS )][0]
        userprofile.room_no = str(i).zfill(3)
        userprofile.usertype = USERTYPE_CHOICES[int( 1.0 * i * len(USERTYPE_CHOICES) / MAX_USERS )][0]
        userprofile.save()
        print "User " + roll_no + " created"
    print "Users done -----------------------------------------------"
        
    # EVENT DETAILS 
    for i in xrange(MAX_EVENT_DETAILS):
        eventdet_category_no = int( 1.0 * i / MAX_EVENT_DETAILS * len(EVENT_CATEGORY_CHOICES) )
        eventdet_category = EVENT_CATEGORY_CHOICES[int( 1.0 * i / MAX_EVENT_DETAILS * len(EVENT_CATEGORY_CHOICES) )][0]
        
        eventdet_no = i % int( 1.0 * MAX_EVENT_DETAILS / len(EVENT_CATEGORY_CHOICES) )
        eventdet_name = eventdet_category + "_" + str(eventdet_no).zfill(2)
        eventdet_desc = ( eventdet_category + " _ " + str(eventdet_no).zfill(2) + " . " ) * 50
        
        if EventDetails.objects.filter(name = eventdet_name).count() == 0:
            eventdet = EventDetails.objects.create()
        else:
            eventdet = EventDetails.objects.get(name = eventdet_name)
            print eventdet_category + " " + eventdet_name + " already existing, using the one which is existing"
        
        eventdet.name = eventdet_name
        eventdet.category = eventdet_category
        eventdet.description = eventdet_desc
        eventdet.is_visible = True
        eventdet.save()
        print "Event " + eventdet_name + " created"
    
        # EVENTS 
        for i in xrange(MAX_EVENTS):
            event_name = "event_" + eventdet.name + "_" + str(i).zfill(2)
            
            event = Event.objects.create(details= eventdet)
            
            event.start_date = datetime.datetime.utcnow().replace(tzinfo = utc)
            event.end_date = datetime.datetime.utcnow().replace(tzinfo = utc)
            event.save()
            print "Event of " + event_name + " created"
    print "Event + Details done -----------------------------------------------"
    
