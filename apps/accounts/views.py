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
            print "got a post req"
            if profileform.is_valid():
                # If the form is valid, save the user using the inbuilt function
                print "form valid"
                profileform.save()   
                print "form saved"
                messages.success(request,'<strong>Done!</strong> Your account information was successfully saved !',extra_tags='alert-success')
                return HttpResponseRedirect(reverse('profile'))
            else:   
                print "form errors"
                print profileform.errors
    return render_to_response('pages/profile.html', locals(), context_instance= global_context(request))
    
# ----------------------------------------------------------------- #
#                       PASSWORD RESET
# ----------------------------------------------------------------- #
"""
def password_reset_done(request,
                        template_name='registration/password_reset_done.html',
                        current_app=None, extra_context=None):
    context = {}
    if extra_context is not None:
        context.update(extra_context)
    return TemplateResponse(request, template_name, context,
                            current_app=current_app)


# Doesn't need csrf_protect since no-one can guess the URL
@sensitive_post_parameters()
@never_cache
def password_reset_confirm(request, uidb64=None, token=None,
                           template_name='registration/password_reset_confirm.html',
                           token_generator=default_token_generator,
                           set_password_form=SetPasswordForm,
                           post_reset_redirect=None,
                           current_app=None, extra_context=None):
    UserModel = get_user_model()
    assert uidb64 is not None and token is not None  # checked by URLconf
    if post_reset_redirect is None:
        post_reset_redirect = reverse('password_reset_complete')
    else:
        post_reset_redirect = resolve_url(post_reset_redirect)
    try:
        uid = urlsafe_base64_decode(uidb64)
        user = UserModel._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
        user = None

    if user is not None and token_generator.check_token(user, token):
        validlink = True
        if request.method == 'POST':
            form = set_password_form(user, request.POST)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(post_reset_redirect)
        else:
            form = set_password_form(None)
    else:
        validlink = False
        form = None
    context = {
        'form': form,
        'validlink': validlink,
    }
    if extra_context is not None:
        context.update(extra_context)
    return TemplateResponse(request, template_name, context,
                            current_app=current_app)

def password_reset_complete(request,
                            template_name='registration/password_reset_complete.html',
                            current_app=None, extra_context=None):
    context = {
        'login_url': resolve_url(settings.LOGIN_URL)
    }
    if extra_context is not None:
        context.update(extra_context)
    return TemplateResponse(request, template_name, context,
                            current_app=current_app)

"""
