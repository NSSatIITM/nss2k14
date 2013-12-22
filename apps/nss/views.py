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

def home (request, *args, **kwargs):
    homepage = True
    carousel_files = [ static(os.path.join('img', 'carousel', i)) for i in os.listdir(os.path.abspath(os.path.join(settings.STATIC_ROOT, 'img', 'carousel'))) ]
    print carousel_files
    return render_to_response('home.html', locals(), context_instance= global_context(request))
