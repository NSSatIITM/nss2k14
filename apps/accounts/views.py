# Django
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from django.contrib import auth
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth.tokens import default_token_generator
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Decorators
from django.contrib.auth.decorators import login_required
from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.cache import never_cache
# Models
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile
# Forms
from apps.accounts.forms import LoginForm, SignUpForm, ProfileForm
# View functions
from django.contrib.auth.views import password_reset, password_reset_confirm
# Misc
from django.templatetags.static import static
# Python
import os

@sensitive_post_parameters()
@never_cache
def login (request):
    """
        This view handles the login and signup related stuff
        
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
                    user = User.objects.get(username=loginform.cleaned_data.get('username'))
                    print user
                    user = auth.authenticate(username=user.username, password=loginform.cleaned_data.get('password'))
                    
                    if user is not None and user.is_active:
                        auth.login(request, user) # Successful login
                        if 'next' in request.POST:
                            return HttpResponseRedirect(request.POST['next'])
                        else:
                            return HttpResponseRedirect(reverse('profile'))
                except User.DoesNotExist:
                    messages.error(request,'<strong>Oops!</strong> You don\'t seem to be registered. Please Sign Up first!',extra_tags='alert-error')
            else:
                print signupform.errors
        
    return render_to_response('pages/login.html', locals(), context_instance= global_context(request))

@login_required
def profile(request, *args, **kwargs):
    profilepage = True
    
    # Create the basic forms which will be rendered in get requests
    user = request.user
    try:
        userprofile = UserProfile.objects.get(user = user)
        #profileform = ProfileForm(instance=userprofile, instance_user=user)
    except:
        userprofile = UserProfile(user = user)
    profileform = ProfileForm(instance=userprofile)
    
    if request.method == 'POST':
        postdata = request.POST.copy()
        if 'profileform' in postdata: # SIGNUP FORM
            profileform = ProfileForm(postdata, instance=userprofile)
            if profileform.is_valid():
                # If the form is valid, save the user using the inbuilt function
                profileform.save()
                messages.success(request,'<strong>Done!</strong> Your account information was successfully saved !',extra_tags='alert-success')
                return HttpResponseRedirect(reverse('profile'))
            else:   
                print "form errors"
                print profileform.errors
        if 'passwordform' in postdata: # SIGNUP FORM
            if postdata['password'] == postdata['confirm_password']:
                user.set_password(postdata['password'])
                user.save()
                print postdata['password']
            else:
                print postdata['password'], postdata['confirm_password']
                passwordform_errors = True
                show_passwordform = True
    if 'show_passwordform' in request.session:
        show_passwordform = request.session['show_passwordform']
        del request.session['show_passwordform']
            
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))
    
# ----------------------------------------------------------------- #
#                       PASSWORD RESET
# ----------------------------------------------------------------- #
@sensitive_post_parameters()
@never_cache
def password_reset_confirm(request, uidb64=None, token=None):
    assert uidb64 is not None and token is not None  # checked by URLconf
    
    from django.utils.http import urlsafe_base64_decode
    from django.contrib.auth.tokens import default_token_generator
    
    try:
        uid = urlsafe_base64_decode(uidb64)
        user = User.objects.get(pk = uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is not None and default_token_generator.check_token(user, token):
        validlink = True
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        auth.login(request, user)
        request.session['show_passwordform'] = True
        return redirect('profile')
    else:
        validlink = False
    
