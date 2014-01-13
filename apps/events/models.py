from django.db import models
from django.contrib.auth.models import User, Group

EVENT_CATEGORY_CHOICES = (
    ('Project', 'Project'),
    ('Event', 'Event')
)

class EventDetails(models.Model):
    # Info

    name            = models.CharField(max_length = 50, blank = False, null = False, unique = True)
    description     = models.TextField(blank = True, null = True)
    category        = models.CharField(max_length = 20, blank = True, null = True, choices = EVENT_CATEGORY_CHOICES)
    is_visible      = models.BooleanField(default = False)
    reps            = models.ManyToManyField(User, related_name='reps', blank = True, null = True)
	#TODO: add reps view!!
	#TODO: get vol list    
    # Dates
    time_created    = models.DateTimeField(auto_now_add=True, null = True)

    # -------- Methods to handle basic data of the class
    def __unicode__(self):
        return self.name
    def get_events(self):
		try:
			elist = Event.objects.filter(details = self)			
			if elist.count() > 0:
				return list(elist)
		except:
			pass
		return None
	def get_reps(self):
		try:
			replist =  list(self.reps.all())
			if replist:
				return replist
		except:
			pass
		return None	

class Event(models.Model):
    # Basic info
    details       = models.ForeignKey(EventDetails) # one-to-many
    #TODO: start and end date as default August 1 and May 31st of this year for all events...This will be used to check for year
    start_date      = models.DateTimeField(null = True)
    end_date        = models.DateTimeField(null = True)
    #TODO: if project-> no google calendar..
    # Specific data
    credits         = models.ManyToManyField(User, through = 'Credit', blank = True, null = True)
    members         = models.ManyToManyField(User, related_name='members', blank = True, null = True)
    # TODO:For event, list will be uploaded..(text comma separated etc..)..many ppl upload-> append to members
    # Finally, give credits-> create credit objects..
	# @Ali:reps not needed for every event..
    # Date
    time_created    = models.DateTimeField(auto_now_add=True, null = True)
    
    # -------- Methods to handle basic data of the class
    def __unicode__(self):
        return self.details.name + "::" + str(self.start_date) + "-" + str(self.end_data)
    
    # -------- Methods to handle fields in the model
    
    # -------- Method to handle ManyToMany fields of the model
    def give_credits(self, **kwargs):
        cred = Credit(event = self,  **kwargs)#TODO:use get_or_create??(avoid duplicates)
        cred.save()#TODO: prevent giving option for PR to add credits with arbitrary dates..
    
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
	def is_project(self):
		return self.details.category == 'Project'
	
	
class Credit(models.Model):
    # people involved in the credit allotment
    awarded_to      = models.ForeignKey(User, related_name='awarded_to')
    awarded_by_id   = models.IntegerField(default = -1) # Cant make a foreign key as only 1 user foreign key is allowed ...
    
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


