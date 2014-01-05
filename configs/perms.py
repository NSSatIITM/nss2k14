# Django
from django.contrib import messages
# Decorators
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Models
# Forms
# View functions
# Misc
# Python
        
#########################################################################################
NSS_GROUPS = (
    'Incharge',     
    'Managerial',   # Managerial team members
    'Project Representative', # PRs for eacsh project
    'Volunteer',    # Volunteers in NSS
    'Helper',       # Helpers in NSS
    'Organisation', # Organizations like NGOs
)

"""
    The syntax for permissions is :
        <type/action>_<object>
"""

NSS_GROUPS = {
    'Incharge' : [  # Equivalent of profs
                    '',
                    
                ],
    'Managerial' : [  # Managerial Team members
                    '',
                ],
    'Project Representative' : [    # PRs for each project
                    '',
                ],
    'Volunteer' : [  # Volunteers in NSS
                    '',
                ],
    'Helper' : [  # Helpers in NSS
                    '',
                ],
    'Organisation' : [  # Helpers in NSS
                    '',
                ],
}
