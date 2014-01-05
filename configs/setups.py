# Django
from django.template.context import Context, RequestContext
from django.contrib import messages
# Decorators
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Models
from django.db import models
from django.contrib.auth.models import User, Group
# Forms
# View functions
# Misc
# Python
        
#########################################################################################
# Setup database commands
def setup_groups():
    GROUPS = (
        'Incharge',     # Equivalent of profs
        'Managerial',   # Managerial team members
        'Project Representative', # PRs for eacsh project
        'Volunteer',    # Volunteers in NSS
        'Helper',       # Helpers in NSS
        'Organisation', # Organizations like NGOs
    )

    for i in GROUPS:
        t = Group.objects.create()
        t.name = i
        t.save()
        #t.permissions.add(
