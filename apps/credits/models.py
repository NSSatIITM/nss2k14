from django.db import models
from django.contrib.auth.models import User, Group

class Credit(models.Model):
    # people involved in the credit allotment
    awarded_by      = models.ForeignKey(User, blank = False, null = False)
    awarded_to      = models.ForeignKey(User, blank = False, null = False)
    
    # Project or Event involved in the credit
    project         = models.ForeignKey(Project, blank = False, null = True)
    event           = models.ForeignKey(Event, blank = False, null = True)
    
    # Reasons and other data
    reason          = models.TextField(blank = True, null = True, help_text = 'A short explanation of what work has been done to receive credits')
    number_of_credits = models.IntegerField(default = 0)
    
    # Time created
    date            = models.DateField(default = datetime.now, htlp_text = 'The date when the credit was alloted')
    time_created    = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return unicode(self.awarded_to) + ': ' + unicode(self.number_of_credits)


