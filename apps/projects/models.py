from django.db import models
from django.contrib.auth.models import User, Group
from apps.credits.models import Credit

class Project(models.Model):
    # Basic info
    name            = models.CharField(max_length = 30, blank = False, null = False)
    category        = models.CharField(max_length = 30, blank = True, null = True)

    # Data
    description     = models.TextField(blank = True, null = True)
    
    #status          = models.ForeignKey(Status, related_name = 'projects', blank = True, null = True, help_text = 'Usually, you will want this to be "Ongoing"')

    # Specific data
    members         = models.ManyToManyField(User, through = 'UserProject', blank = True, null = True)
    credits         = models.ManyToManyField(Credit, through = 'Credit', blank = True, null = True)
    
    def __unicode__(self):
        return self.name
    
