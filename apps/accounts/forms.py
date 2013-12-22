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
# Forms
# View functions
# Misc
from django.templatetags.static import static
from captcha.fields import CaptchaField
# Python
import os


class SignUpForm(forms.Form):
    """To grab the user's email (and a signing-up password?)"""
    formfield_callback = bootstrap_form
    
    first_name = forms.CharField(max_length='40', widget=forms.TextInput(attrs={'required':'true'}))
    last_name = forms.CharField(max_length='40',widget=forms.TextInput(attrs={'required':'true'}))
    email = forms.EmailField(help_text = 'email@example.com', widget=forms.TextInput(attrs={'required':'true','type':'email'}))
    password = forms.CharField(max_length=30, widget=forms.PasswordInput(attrs={'required':'true'}))
    captcha = CaptchaField()
    
"""    def save(self, *args, **kwargs):
        user = User.objects.create_user(signupform.cleaned_data.get('email'), signupform.cleaned_data.get('email'), signupform.cleaned_data.get('password'))
        user.first_name = signupform.cleaned_data.get('first_name')
        user.last_name = signupform.cleaned_data.get('last_name')
        user.save()
"""

class LoginForm(forms.Form):
    email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'required':'true','type':'email'}))
    password = forms.CharField(required=True,widget=forms.PasswordInput(attrs={'required':'true'}))
    
