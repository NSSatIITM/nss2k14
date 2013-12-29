nss2k14

A new nss website. afresh.

Setup :
>> Folder structure
0 - apps        - has basic written (by us) apps used by django site
0 - configs     - has configurations, requirements etc
0 - files       - has static, media and other files
0 - misc        - has random stuff which you dont know where to put or global stuff which is needed everywhere
0 - tasks       - has async tasks that we may use
0 - templates   - has html templates
0 - venv        - the virtualenv that you shouldve set uo (if you wanna ...)


>> Setup the machine 
    To setup the machine, you first need to create a virtualenv :
0 - Install virtualenv with : "sudo apt-get install virtualenv"
0 - Now, go intot he nss2k14 django project folder and run "virtualenv --no-site-packages venv"
0 - Now, python shouldve installed in the new folder "venv"
0 - To activate the virtualenv, run "source venv/bin/activate"
0 - To check if the virtualenv is being used run "which python" the path should be inside the venv
0 - Awesome ! now you have a venv running !
    Now, you need to install django and other required dependencies
0 - The configs/requirements.txt file should have a list of all python deps with versions check it out !
0 - Run "pip install -r configs/requirements.txt" to execute the recursive install feature in pip to install all deps :)
0 - Thats it ! You now can finish up with local setup and run the website !

>> Local setup
    On local, simply copy the configs/settings-sample.py file to configs/settings.py and change database settings.
    This should get you a good running environment !
    
>> Server setup
    On server, the settings file resides at configs/settings.py This is done to avoid confusion and the wsgi file automatically searched for the venv folder. It will cause errors if no such virtualenv exists !



