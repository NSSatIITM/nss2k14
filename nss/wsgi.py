"""
WSGI config for nss project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os
import sys
import site

# Add virtual environment to site directories:
site.addsitedir('/var/sites/nss/git/nss2k14/venv/lib/python2.6/site-packages')

path = ['/var/sites/nss/flup-1.0.2',
	'/var/sites/nss/git/nss2k14/nss', 
	'/var/sites/nss/git/nss2k14',
	'/var/sites/nss/git/nss2k14/venv',
	'/var/sites/nss/git/nss2k14/venv/bin',
	'/var/sites/nss/git/nss2k14/venv/lib',
	'/var/sites/nss/git/nss2k14/venv/lib/python2.6/site-packages',
	]
for i in path: # If path exists, remove and add on the top
    if i not in sys.path: 
        sys.path.insert(0, i)
    else:
        while i in sys.path:
            sys.path.remove(i)
        sys.path.insert(0, i)

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
VENV_FILE = os.path.abspath(os.path.join(ROOT_PATH, 'venv', 'bin', 'activate_this.py'))
execfile(VENV_FILE, dict(__file__=VENV_FILE))

# Switch to the directory of your project. (Optional)
os.chdir("/var/sites/nss/git/nss2k14/")

# Set the DJANGO_SETTINGS_MODULE environment variables
os.environ['PYTHON_EGG_CACHE'] = "/var/sites/nss/.python-eggs"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nss.settings")

# This application object is used by any WSGI server configured to use this
# file. This includes Django's development server, if the WSGI_APPLICATION
# setting points here.
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Apply WSGI middleware here.
# from helloworld.wsgi import HelloWorldApplication
# application = HelloWorldApplication(application)
