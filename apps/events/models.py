from django.db import models
from django.contrib.auth.models import User, Group

class Event(models.Model):
    # Basic info
    name            = models.CharField(max_length = 30blank = False, null = False)
    
    # Data
    description     = models.TextField(blank = True, null = True)
    
    # Specific data
    credits         = models.ManyToManyField(Credit, through = 'Credit', blank = True, null = True)
    
    def __unicode__(self):
        return self.name
    

