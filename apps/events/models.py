from django.db import models
from django.contrib.auth.models import User, Group

class Event(models.Model):
    # Basic info
    name            = models.CharField(max_length = 30, blank = False, null = False)
    years           = models.CharField(max_length = 7, blank = True, null = True)
    category        = models.CharField(max_length = 30, blank = True, null = True)
    
    # Data
    description     = models.TextField(blank = True, null = True)
    
    # Specific data
    credits         = models.ManyToManyField(User, through = 'Credit', blank = True, null = True)
    members         = models.ManyToManyField(User, related_name='members', blank = True, null = True)
    reps            = models.ManyToManyField(User, related_name='reps', blank = True, null = True)
    
    # Dates
    time_created    = models.DateTimeField(auto_now_add=True, null = True)
    
    
    def __unicode__(self):
        return self.name
    
    def give_credits(self, **kwargs):
        cred = Credit(event = self,  **kwargs)
        cred.save()
    
    def remove_credits(self, member):
        cred = Credit.objects.get(project=self, member=member)
        cred.delete()
    
    def get_credits(self):
        creds = Credit.objects.filter(project=self)
        member_ids = [cred.member.id for cred in creds]
        members = User.objects.none()
        for id in member_ids:
            members = members | User.objects.get(id=id)
        return members

class Credit(models.Model):
    # people involved in the credit allotment
    awarded_to      = models.ForeignKey(User, related_name='awarded_to')
    awarded_by_id   = models.IntegerField(default = 0) # Cant make a foreign key as only 1 user foreign key is allowed ...
    
    # Project or Event involved in the credit
    event           = models.ForeignKey(Event)
    
    # Reasons and other data
    reason          = models.TextField(blank = False, null = True, help_text = 'A short explanation of what work has been done to receive credits')
    number_of_credits = models.IntegerField(default = 0)
    
    # Time created
    date            = models.DateField(null = True, help_text = 'The date when the credit was alloted')
    time_created    = models.DateTimeField(auto_now_add=True, null = True)
    
    def __unicode__(self):
        return unicode(self.awarded_to) + ': ' + unicode(self.number_of_credits)
    
    def awarded_by(self):
        return User.objects.get(id=self.awarded_by_id)



