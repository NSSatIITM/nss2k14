#Views
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from misc.utils import *  #Import miscellaneous functions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages

def home (request, *args, **kwargs):
    
    return render_to_response('home.html', locals(), context_instance= global_context(request))
