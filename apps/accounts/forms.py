# Django
from django import forms
from django.contrib import messages
from django.contrib.auth import authenticate
import django.contrib.admin.widgets as adminWidgets
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Decorators
# Models
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile
# Forms
# View functions
# Misc
from django.templatetags.static import static
# Python
import os


class SignUpForm(forms.Form):
    """To grab the user's email (and a signing-up password?)"""
    first_name = forms.CharField(max_length='40', widget=forms.TextInput(attrs={'required':'true'}))
    last_name = forms.CharField(max_length='40', widget=forms.TextInput(attrs={'required':'true'}))
    email = forms.EmailField(help_text = 'email@example.com', widget=forms.TextInput(attrs={'required':'true','type':'email'}))
    password = forms.CharField(max_length=30, widget=forms.PasswordInput(attrs={'required':'true'}))
    
    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
    
    def clean_password(self):
        """
            The password can only be lowercase.
        """
        data = self.cleaned_data['password']
        data = data.lower()
        return data
    
    def save(self, *args, **kwargs):
        """
            Creates a User object and makes it inactive
            The user profile will have to be created later on
        """
        user = User.objects.create_user(self.cleaned_data.get('email'), self.cleaned_data.get('email'), self.cleaned_data.get('password'))
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.is_active = False
        user.save()
    
class LoginForm(forms.Form):
    username = forms.CharField(required=True, widget=forms.TextInput(attrs={'required':'true'}))
    password = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'required':'true'}))
    
    def clean_username(self):
        """
            The username can only be lowercase.
        """
        data = self.cleaned_data['username']
        data = data.lower()
        return data
    
    def clean_password(self):
        """
            The password can only be lowercase.
        """
        data = self.cleaned_data['password']
        data = data.lower()
        return data
        
class ProfileForm(forms.ModelForm):
    phone_number = forms.CharField(max_length = 10, min_length = 10,help_text = 'eg: 9841072571. Not available publicly.', required = False)
    extra_email = forms.CharField(max_length = 50, required = False)
    first_name = forms.CharField(max_length = 50, required = False)
    last_name = forms.CharField(max_length = 50, required = False)
    email = forms.CharField(max_length = 50, required = False)
    
    def clean_phone_number(self):
        """
            The phone number field is a character field.
            This method cleans it correctly for a phone number
        """
        data = self.cleaned_data['phone_number']
        data = "".join(data.split()).replace("+", "")
        if not data.isdigit():
            raise forms.ValidationError("Your phone number is invalid.")
        return data
        
    class Meta:
        model = UserProfile
        fields = ( 'roll_no', 'phone_number', 'gender', 'hostel', 'room_no' )
        
    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        
        self.fields['first_name'].initial = self.instance.user.first_name
        self.fields['last_name'].initial = self.instance.user.last_name
        self.fields['email'].initial = self.instance.user.email
    
    #def save(self, *args, **kwargs):
        
