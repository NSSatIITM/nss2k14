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
from apps.accounts.forms import LoginForm, SignUpForm
# View functions
# Misc
from django.templatetags.static import static
# Python
import os

def login (request):
    loginpage = True
    loginform = LoginForm()
    signupform = SignUpForm()
    
    return render_to_response('pages/login.html', locals(), context_instance= global_context(request))

def profile(request):
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))

def profile(request):
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))

