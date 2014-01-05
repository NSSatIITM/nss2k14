# Django
from django.conf.urls import patterns, include, url
from django.contrib import admin
# NSS
import configs.settings as settings
# Decorators
# Models
# Forms
# View functions
# Misc
# Python

# Admin
admin.autodiscover()
# Dajaxice
from misc.dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()

urlpatterns = patterns('',

    # ------------------------------------------------------------------
    # NSS APPS
    url(r'^$', 'apps.nss.views.home', name='home'),
    url(r'^home/?$', 'apps.nss.views.home', name='home'),
    url(r'^profile/?$', 'apps.accounts.views.profile', name='profile'),
    url(r'^events/?$', 'apps.events.views.events', name='events'),
    url(r'^projects/?$', 'apps.events.views.projects', name='projects'),
    url(r'^aboutus/?$', 'apps.nss.views.aboutus', name='aboutus'),
    url(r'^login/?$', 'apps.accounts.views.login', name='login'),
    
    url(r'^404/?$', 'apps.nss.views.err404', name='err404'),
    url(r'^500/?$', 'apps.nss.views.err500', name='err500'),
    
    
    
    # ------------------------------------------------------------------
    # DJANGO APPS - OVERRIDDEN
    

    # ------------------------------------------------------------------
    # DJANGO APPS
    # Admin
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # Auth
    url(r'^logout/?$', 'django.contrib.auth.views.logout', {'next_page':'/'}, name='logout'),
    url(r'^passwd_reset/?$','django.contrib.auth.views.password_reset',{'template_name':'password/reset.html'}),
    url(r'^passwd_reset/reset/done/?$','django.contrib.auth.views.password_reset_done',{'template_name':'password/reset_done.html'}),
    url(r'^passwd_reset/reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/?$','django.contrib.auth.views.password_reset_confirm',{'template_name':'password/reset_new_password.html'}),
    url(r'^passwd_reset/reset/complete/?$','django.contrib.auth.views.password_reset_complete',{'template_name':'password/reset_complete.html'}),
    # Media files
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': settings.MEDIA_ROOT }),
    
    # ------------------------------------------------------------------
    # THIRD PARTY APPS
    # Captcha urls
    url(r'^captcha/', include('captcha.urls')),
    # Social Auth
    url(r'', include('social_auth.urls')),
    # Dajaxice
    url(dajaxice_config.dajaxice_url, include('misc.dajaxice.urls')), # For dajaxice to function corrently
    
)

# 400 & 500
handler404 = 'apps.nss.views.err404'
handler500 = 'apps.nss.views.err500'

# This is to test out DEBUG = False in localhost
# REMEMBER : Should be commented out on server !
if ( settings.SITE_URL.find("localhost") != -1 or settings.SITE_URL.find("127.0.") != -1 ) and not settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
