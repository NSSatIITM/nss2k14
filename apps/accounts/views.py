# Django
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from django.contrib import auth
from django.contrib import messages
from django.db import IntegrityError
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Decorators
# Models
from django.contrib.auth.models import User
# Forms
from apps.accounts.forms import LoginForm, SignUpForm
# View functions
# Misc
from django.templatetags.static import static
# Python
import os

def login (request):
    """
        This view handles the login and signup related stuff
        Registration : 
            Anybody can create an account. The account will have to be validated by a managerial team member
        Login :
            Normal login
    """ 
    loginpage = True
    
    # Create the basic forms which will be rendered in get requests
    loginform = LoginForm()
    signupform = SignUpForm()
    
    if request.user.is_authenticated(): # If user logged in : Redirect to home
        return HttpResponseRedirect(reverse('home'))
    
    # If the form has been submitted, get the form data and handle the appropriate way
    if request.method == 'POST':
        postdata = request.POST.copy()
        if 'signup' in postdata: # SIGNUP FORM
            signupform = SignUpForm(postdata)
            if signupform.is_valid():
                # If the form is valid, save the user using the inbuilt function
                try:
                    signupform.save()   
                    messages.success(request,'<strong>Hi!</strong> Your account has been made, but is not yet activated. We will review and activate your account soon !',extra_tags='alert-success')
                    return HttpResponseRedirect(reverse('home'))
                except IntegrityError: # The username (email) already exists
                    messages.error(request,'<strong>Oops!</strong> That email id has already been signed up. Try logging in !',extra_tags='alert-danger')
            else:
                print signupform.errors
        elif 'login' in postdata: # LOGIN FORM
            loginform = LoginForm(postdata)
            if loginform.is_valid():
                try:
                    user = User.objects.get(email=loginform.cleaned_data.get('email'))
                    user = auth.authenticate(username=user.username, password=loginform.cleaned_data.get('password'))
                    
                    if user is not None and user.is_active:
                        auth.login(request, user) # Successful login
                        if 'next' in request.POST:
                            return HttpResponseRedirect(request.POST['next'])
                        else:
                            return HttpResponseRedirect(reverse('home'))
                except User.DoesNotExist:
                    messages.error(request,'<strong>Oops!</strong> You don\'t seem to be registered. Please Sign Up first!',extra_tags='alert-error')
            else:
                print signupform.errors
        
    return render_to_response('pages/login.html', locals(), context_instance= global_context(request))

def profile(request):
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))
