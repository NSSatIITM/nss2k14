from django.conf.urls.defaults import *
from misc.dajaxice.views import DajaxiceRequest

urlpatterns = patterns('misc.dajaxice.views',
    url(r'^(.+)/$', DajaxiceRequest.as_view(), name='dajaxice-call-endpoint'),
    url(r'', DajaxiceRequest.as_view(), name='dajaxice-endpoint'),
)
