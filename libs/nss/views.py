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
# Python


def home (request, *args, **kwargs):
    
    return render_to_response('home.html', locals(), context_instance= global_context(request))
