# Django
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.template import RequestContext
from django.template.loader import render_to_string
from django.shortcuts import redirect
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Dajaxice 
from misc.dajax.core import Dajax
from misc.dajaxice.decorators import dajaxice_register
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
import json

@dajaxice_register(name="accounts.test_dajax")
def test_dajax(request):
    """
        Simple function to rest (D)ajax(ice)
    """
    dajax = Dajax() # To hold the json
    dajax.script('alert(\'hello\');');
    dajax.script( '$("#container_messages").append(\'<div class="span8 offset2"><div class="alert ' + 'alert-success' + ' center"><button type="button" class="close" data-dismiss="alert"><i class="icon-close">&times;</i></button>' + 'This is a test script! No need to listen to me.' + ' </div></div><div class="offset2"></div>\')' )
    return dajax.json()
    
@dajaxice_register(name='accounts.password_reset', method='POST')
def password_reset(request, username=None, email=None):
    """
        Generates a one-use only link for resetting password and sends to the user.
    """
    from django.utils.http import urlsafe_base64_encode
    from django.core.mail import send_mail
    from django.contrib.sites.models import get_current_site
    from django.utils.encoding import force_bytes
    from django.contrib.auth.tokens import default_token_generator
    
    dajax = Dajax() # To hold the json
    if username:
        active_users = User.objects.filter(username__iexact=username, is_active=True)
        count = 0
        for user in active_users:
            if not user.has_usable_password():
                continue
            c = {
                'email': user.email,
                'site_url': settings.SITE_URL,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'user': user,
                'token': default_token_generator.make_token(user),
                'protocol': 'http',
            }
            subject = 'NSS-IITM Password Reset Request'
            email = render_to_string('emails/password_reset.html', c)
            ret_val = send_mail(subject, email, settings.DEFAULT_FROM_EMAIL, [user.email])
            print ret_val
            count = count + 1;
        print count, "emails sent !"
        if count:
            dajax.script('alert(\'Username sent!\')') # To hold the json
        else:
            dajax.script('alert(\'Username not found!\')') # To hold the json
    else:
        dajax.script('alert(\'Please enter a username !\')')
    return dajax.json()
