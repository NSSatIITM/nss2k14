from django.db import models
from django.contrib.auth.models import User, Group

GENDER_CHOICES = (
    ('M','Male'),
    ('F','Female'),
    ('N','Choose not to answer'),
)

class UserProfile(models.Model):
    # Foreign Key for the User class
    user            = models.ForeignKey(User, unique = True)

    # Identification number
    roll_no         = models.CharField(max_length = 10, blank = False, null = True)
    
    # Personal info
    gender          = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N')
    phone_number    = models.CharField(max_length = 10, help_text='eg: 9841072571.',null = True, blank = True)
    hostel          = models.CharField(max_length = 15, blank = True, null = True)
    room_no         = models.CharField(max_length = 10, blank = True, null = True)

    # Extra emails the person may want to attach to the account
    additional_emails = models.CharField(max_length = 500, blank = True, null = True) # Separated by semicolons
    
    # Activation keys
    activation_key  = models.CharField(max_length = 40, null = True)
    activation_key_mobile  = models.CharField(max_length = 6, null = True)
    
    def __unicode__(self):
        return self.user.username
    
    def get_alt_emails(self):
        return [i.strip() for i in self.additional_emails.split(";")]
    def add_alt_email(self, email_addr):
        # Do email check and add it
        self.additional_emails += ";" + email_addr
        return True
        [i.strip() for i in self.additional_emails.split(";")]
        
    class Admin:
        pass

