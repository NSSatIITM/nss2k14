# Django
from django.shortcuts import render_to_response, redirect, HttpResponseRedirect
from django.contrib import auth
from django.contrib import messages
from django.db import IntegrityError
# NSS
import configs.settings as settings
from misc.utils import *  #Import miscellaneous functions
# Decorators
from social_auth.decorators import dsa_view, disconnect_view
from django.contrib.auth.decorators import login_required
# Models
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile
# Forms
from apps.accounts.forms import LoginForm, SignUpForm, ProfileForm
# View functions
from social_auth.views import auth as social_auth_auth, complete as social_auth_complete
# Misc
from django.templatetags.static import static
from social_auth.utils import setting, backend_setting, clean_partial_pipeline
from social_auth.exceptions import AuthCanceled, AuthFailed, AuthException, NotAllowedToDisconnect
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
                    user = User.objects.get(username=loginform.cleaned_data.get('username'))
                    print user
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
        if 'profile' in postdata: # SIGNUP FORM
            profileform = ProfileForm(postdata, instance=userprofile)
            if profileform.is_valid():
                # If the form is valid, save the user using the inbuilt function
                profileform.save()   
                messages.success(request,'<strong>Hi!</strong> Your account was successfully saved !',extra_tags='alert-success')
                return HttpResponseRedirect(reverse('home'))
            else:
                print profileform.errors
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))
    
# ---------------------------------------------------------------------
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>               SOCIAL AUTH RELATED VIEWS
# ---------------------------------------------------------------------
def socialauth_connected(request, *args, **kwargs):
    messages.success(request,'<strong>Who\'s awesome?</strong> YOU\'re awesome! Successfully connected!',extra_tags='alert-success')
    return HttpResponseRedirect(reverse('accounts.views.profile'))

def socialauth_disconnected(request, *args, **kwargs):
    messages.error(request,'<strong>OW, Snap!</strong> Why did you do that? If you\'re worried that we will post without your consent, we assure you that we will <strong>never</strong> do that. Please consider connecting again.',extra_tags='alert-error')
    return HttpResponseRedirect(reverse('accounts.views.profile'))

def socialauth_error(request, *args, **kwargs):    
    messages.error(request,'<strong>OW!</strong> There was some problem with your login. Please try again after sometime !',extra_tags='alert-error')
    return HttpResponseRedirect(reverse('apps.accounts.views.home'))

def socialauth_complete(request, backend, *args, **kwargs):
    try:
        return social_auth_complete(request, backend, *args, **kwargs)
    except AuthException as e:
        msg = u'<strong>OW, Snap!</strong> There seems to have been some problem while processing your request. Please try again later'
        messages.error(request, msg, extra_tags='alert-error')
        return HttpResponseRedirect(reverse('bloodline_server.views.home') + "#login")
    except AuthCanceled as e:
        msg = u'<strong>OW, Snap!</strong> Why did you do that? If you\'re worried that we will post without your consent, we assure you that we will <strong>never</strong> do that. Please consider signing up.'
        messages.error(request, msg, extra_tags='alert-error')
        return HttpResponseRedirect(reverse('bloodline_server.views.home') + "#login")

@login_required
@dsa_view()
@disconnect_view
def socialauth_disconnect(request, backend, association_id=None):
    """Disconnects given backend from current logged in user."""

    try:
        backend.disconnect(request.user, association_id)
    except NotAllowedToDisconnect:
        messages.error(request,'<strong>OW!</strong> This is the only way you can login ! <br />We cannot disconnect this as you won\'t be able to access NSS Website without it.',extra_tags='alert-error')
        return HttpResponseRedirect(reverse('accounts.views.profile'))
        
    DEFAULT_REDIRECT = setting('SOCIAL_AUTH_LOGIN_REDIRECT_URL', setting('LOGIN_REDIRECT_URL'))
    
    url = request.REQUEST.get(REDIRECT_FIELD_NAME, '') or \
          backend_setting(backend, 'SOCIAL_AUTH_DISCONNECT_REDIRECT_URL') or \
          DEFAULT_REDIRECT
    return HttpResponseRedirect(url)
