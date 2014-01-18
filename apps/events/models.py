from django.db import models
from django.contrib.auth.models import User, Group

EVENT_CATEGORY_CHOICES = (
    ('Project', 'Project'),
    ('Event',   'Event'),
    ('Wintern', 'Wintern')
)

class EventInstance(models.Model):
    # Basic info
    start_date      = models.DateTimeField(null = True)
    end_date        = models.DateTimeField(null = True)
    is_visible      = models.BooleanField(default = False)
    
    # Specific data
    credits         = models.ManyToManyField(User, related_name='credit_set', through = 'Credit', blank = True, null = True)
    members         = models.ManyToManyField(User, related_name='eventmember_set', blank = True, null = True)
    reps            = models.ManyToManyField(User, related_name='eventrep_set', blank = True, null = True)
    
    # Dates
    time_created    = models.DateTimeField(auto_now_add=True, null = True)
    
    # -------- Methods to handle basic data of the class
    def __unicode__(self):
        return self.details.name + "::" + str(self.start_date) + "-" + str(self.end_data)
    
    # -------- Methods to handle fields in the model
    
    # -------- Method to handle ManyToMany fields of the model
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

class Event(models.Model):
    # Info
    name            = models.CharField(max_length = 30, blank = False, null = False, unique = True)
    description     = models.TextField(blank = True, null = True)
    category        = models.CharField(max_length = 30, blank = True, null = True, choices = EVENT_CATEGORY_CHOICES)
    is_visible      = models.BooleanField(default = False)
    
    # m2m for event
    instances       = models.ManyToManyField(EventInstance, related_name = 'event', blank = True, null = True)
    
    # Dates
    time_created    = models.DateTimeField(auto_now_add=True, null = True)

    # -------- Methods to handle basic data of the class
    def __unicode__(self):
        return self.name
    
class Credit(models.Model):
    # people involved in the credit allotment
    awarded_to      = models.ForeignKey(User, related_name='awarded_to')
    awarded_by_id   = models.IntegerField(default = 0) # Cant make a foreign key as only 1 user foreign key is allowed ...
    
    # Project or Event involved in the credit
    event           = models.ForeignKey(EventInstance)
    
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



