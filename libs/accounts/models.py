from django.db import models
from django.contrib.auth.models import User, Group

GENDER_CHOICES = (
    ('M','Male'),
    ('F','Female'),
    ('N','Choose not to answer'),
)

class UserProfile(models.Model):
    user = models.ForeignKey(User, unique = True)
    
    # Personal info
    gender = models.CharField(max_length=1,choices=GENDER_CHOICES,default='N')
    phone_number = models.CharField(max_length = 10, help_text='eg: 9841072571.',null = True, blank = True)
    
    feedback = models.TextField(null = True, blank = True, help_text = 'We\'d love to hear from you! Please feel free to let us know what you think.')

    def __unicode__(self):
        return self.user.username

    class Admin:
        pass
