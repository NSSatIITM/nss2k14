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
    url(r'^$', 'libs.nss.views.home', name='home'),
    #url(r'^nss/', include('libs.nss.foo.urls')),

    # Admin
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    
    # Captcha urls
    url(r'^captcha/', include('captcha.urls')),

    # Social Auth
    url(r'', include('social_auth.urls')),

    # Dajaxice
    url(dajaxice_config.dajaxice_url, include('misc.dajaxice.urls')), # For dajaxice to function corrently
    
    # Media files
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': settings.MEDIA_ROOT }),
)

# 400 & 500
#handler404 = 'bloodline_server.views.show404'
#handler500 = 'bloodline_server.views.show500'

# This is to test out DEBUG = False in localhost
# REMEMBER : Should be commented out on server !
if ( settings.SITE_URL.find("localhost") != -1 or settings.SITE_URL.find("127.0.") != -1 ) and not settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
