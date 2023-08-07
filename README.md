# Set up project

## Create a new Django project
`django-admin startproject api`

## Set up the virtual environment:
- Change into the project directory:
`cd api`

- Create a new virtual environment:
`python3 -m venv venv`

- Activate the virtual environment:
     - window: `venv\Scripts\activate`
     - mac: `source venv/bin/activate`

## Install Django and Django REST Framework
`pip install django djangorestframework`

## Create the Django app
### Create a new app within Django project
Run the following command to create a new Django app within your project
`python3 manage.py startapp learning_notes_app`

### Configure the project so it knows about the new app
- In **api/settings.py** by adding the following code to `INSTALLED_APPS`

```python
INSTALLED_APPS = [
    ...

    "learning_notes_app.apps.LearningNotesAppConfig",
]
```

## Start the development servers:
- In terminal for api, run the following command to start the Django development server:
     - `python3 manage.py runserver`

At this point, you should have your Django backend and React frontend up and running. The Django development server will be accessible at http://localhost:8000

# Building backend

## 1. Define Django models
Inside api folder, open `learning_notes_app/models.py` in learning_notes_app.

Import necessary modules and define models for our data including `User` class and `LearningNote` class

## 2. Create Django database migrations
After creating data models, run the following command to generate the initial database migration files:
```
python3 manage.py makemigrations
python3 manage.py migrate
```

## 3. (Optional) Register model with Django Admin panel (if we want to use our models in Django Admin panel)

### Create a user in Administration
Run following command

```
python3 manage.py createsuperuser
```

Then type in email and password. Start the server again `python manage.py runserver`

### Register model with Django Admin panel
Import models and register models in learning_notes_app/admin.py
Save the file
Refresh website again
The models should now show up in Admin panel
We can modify model's data directly using Django Admin panel

## 4. Implement Django REST Framework API views and serializers for the LearningNote model
Create a serializers file: In your Django app, create a new file named **serializers.py** (learning_notes_app/serializers.py).
     - Import the necessary modules and classes
     - Define the LearningNoteSerializer class:

Create the API views in the **views.py** file (learning_notes_app/views.py).

Set up the URL pattern to link the view to an API endpoint in `learning_note_app/urls.py`

## 5. Enable `Access-Control-Allow-Origin` (CORS) in Django
We do this step to enable frontend to make successful requests to backend
- Install `django-cors-headers` package
     ```
     pip install django-cors-headers
     ```

- Update Django settings in `settings.py`
- Restart Django development server

## 6. Set up Token-based authentication for the application
Add `rest_framework.authtoken` to `INSTALLED_APPS` in **settings.py**
Set `permission_classes` of `LearningNoteListView` to `IsAuthenticated`
```
permission_classes = [IsAuthenticated]
```
By using `AllowAny`, we allow unauthenticated users to access this view. However, keep in mind that this means anyone can access the learning notes list without authentication.

## 7. Implement user login feature
- Ensure that you have the necessary authentication settings in your Django settings. You can use Django's built-in authentication system, which includes authentication backends and authentication middleware.
- Make sure that the `django.contrib.auth` app is included in your `INSTALLED_APPS`.
- Configure the authentication backend in your **settings.py** file to use Django's built-in ModelBackend:
     ```
     AUTHENTICATION_BACKENDS = [
     'django.contrib.auth.backends.ModelBackend',
     ]
     ```
- Create a URL pattern for the login view in your `urls.py`
- Implement the login view (LoginAPIView) in your `views.py`

**If you encounter an error during login such as `no such table: authtoken_token`, you should create and apply missing migrations, including the migration for the `authtoken` app**

## 8. Implement feature for archiving a learning note
- In **learning_notes_app/models.py**, add the `archived` field to the `LearningNote` model.
- Then make and apply the migration.
- Add the `archived` field to `LearningNoteSerializer` in the backend.
- Update the views to handle archiving.
- Add the URL pattern to **urls.py** for archiving a learning note.

## 9. Implement feature to update a learning note
- Modify the LearningNote model to allow for the update of the title and content fields
     - Since we also want to update the `updated_at` timestamp, it's a good idea to override the save method in the model to handle these updates automatically.
- Create a view in `views.py` file that handles the update of a learning note based on the received data.
- Add the URL pattern for updating a learning note.

