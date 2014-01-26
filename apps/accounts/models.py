from django.db import models
from django.contrib.auth.models import User, Group

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('N', 'Choose not to answer'),
)

HOSTEL_CHOICES = (
    ('Alakananda', 'Alakananda'),
    ('Godavari', 'Godavari'),
    ('Jamuna', 'Jamuna'),
    ('Mandakini', 'Mandakini'),
    ('Ganga', 'Ganga'),
    ('Tapti', 'Tapti'),
    ('Saraswathi', 'Saraswathi'),
    ('Narmadha', 'Narmadha'),
    ('Mahanadi', 'Mahanadi'),
    ('Brahmaputra', 'Brahmaputra'),
    ('Sharavati', 'Sharavati'),
)

USERTYPE_CHOICES = (
    (0, 'User'),
    (1, 'Manager'),
)

class UserProfile(models.Model):
    # Foreign Key for the User class
    user            = models.ForeignKey(User, unique = True, related_name = 'profile_set')

    # Identification number
    roll_no         = models.CharField(max_length = 10, blank = False, null = True)
    
    # Personal info
    phone_number    = models.CharField(max_length = 10, null = True, blank = True)
    gender          = models.CharField(max_length = 1, choices=GENDER_CHOICES, default='N')
    hostel          = models.CharField(max_length = 15, choices=HOSTEL_CHOICES, blank = True, null = True)
    room_no         = models.CharField(max_length = 10, blank = True, null = True)
    additional_emails = models.CharField(max_length = 500, blank = True, null = True) # Separated by semicolons
    
    # Extra info 
    usertype        = models.IntegerField(max_length = 20, blank = True, null = False, choices = USERTYPE_CHOICES, default = 0) # To tell something extra about the user
    
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
        
    def basic_info(self):
        """
            Basic required fields are : Hostel, Room, Phone number, roll number
        """
        unknown_data = []
        if self.hostel != None and self.hostel != "":
            unknown_data.append("Hostel Name")
        if self.room_no != None and self.room_no != "":
            unknown_data.append("Room Number")
        if self.phone_number != None and self.phone_number != "":
            unknown_data.append("Phone Number")
        if self.roll_no != None and self.roll_no != "":
            unknown_data.append("Roll Number")
        return unknown_data
        
    def is_manager(self):
        return self.usertype == 4
        
    class Admin:
        pass

