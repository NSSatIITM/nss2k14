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
    dajax.script("alert('hello');");
    dajax.script( '$("#row_messages").html($("#row_messages").html() + \'<div class="span8 offset2"><div class="alert ' + 'alert-success' + ' center"><button type="button" class="close" data-dismiss="alert"><i class="icon-close">&times;</i></button>' + 'This is a test script! No need to listen to me.' + ' </div></div><div class="offset2"></div>\')' )
    return dajax.json()
