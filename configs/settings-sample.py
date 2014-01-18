#!/usr/bin/python
# -*- coding: utf-8 -*-

import global_settings
from global_settings import *

#Django settings that are specific to each machine for the project bloodline_server.
import os
PROJECT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))

DEBUG = True
TEMPLATE_DEBUG = DEBUG
DAJAXICE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']

#Absolute URL where the site has been hosted.
# IMPORTANT : Don't add the trailing slash.
SITE_URL = 'http://localhost:8000'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'NSS_DB_NAME',                      # Or path to database file if using sqlite3.
        'USER': 'SQL_ID',                      # Not used with sqlite3.
        'PASSWORD': 'SQL_PWD',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

SEND_EMAILS = False

#EMAIL_HOST = 'smtp.gmail.com'
#DEFAULT_FROM_EMAIL = 'Abdeali NSS <noreply@ajknss.iitm.ac.in>'
#EMAIL_HOST_USER = 'abdealikothari@gmail.com'
#EMAIL_HOST_PASSWORD = ''
#EMAIL_PORT = 587
#EMAIL_USE_TLS = True

OVERRIDE_MOBILE = True

# ROOT_PASSWORD = 'pbkdf2_sha256$12000$aSTNMzxwaUKC$l5HxYV8T3R2+p8fAWuEet/Q9XKvJYOSC8D6LSvI6H14=' # This is the password '1' ... for easy login for admins :)
