# Set up project

## Create a new Django project
`django-admin startproject backend`

## Set up the virtual environment:
- Change into the project directory:
`cd backend`

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
- In backend/settings.py by adding the following code to `INSTALLED_APPS`

```python
INSTALLED_APPS = [
    ...

    "learning_notes_app.apps.LearningNotesAppConfig",
]
```


## Set up the frontend using Create React App:
- In a separate terminal or command prompt, navigate to the root of your project directory.
- Run the following command to set up the frontend with Create React App:
     - `npx create-react-app frontend`

(At this point, we have 2 terminals open at the same time. One on backend and another on frontend)

## Install Redux and Axios for frontend state management and API communication
- Change into the frontend directory:
     - `cd frontend`
- Run the following command to install Redux and Axios
     - `npm install redux react-redux axios`

## Start the development servers:
- In terminal for backend, run the following command to start the Django development server:
     - `python3 manage.py runserver`
- In terminal for frontend, run the following code to start the React development server:
     - `npm start`

At this point, you should have your Django backend and React frontend up and running. The Django development server will be accessible at http://localhost:8000, and the React development server will be accessible at http://localhost:3000.


# Building backend

## 1. Define Django models
Inside backend folder, open `learning_notes_app/models.py` in learning_notes_app.

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
python manage.py createsuperuser
```

Then type in email and password. Start the server again `python manage.py runserver`

### Register model with Django Admin panel
Import models and register models in learning_notes_app/admin.py
Save the file
Refresh website again
The models should now show up in Admin panel
We can modify model's data directly using Django Admin panel

## 4. Implement Django REST Framework API views and serializers for the LearningNote model
Create a serializers file: In your Django app, create a new file named serializers.py (learning_notes_app/serializers.py).
     - Import the necessary modules and classes
     - Define the LearningNoteSerializer class:

Create the API views in the api.py file (learning_notes_app/api.py).


Set up the URL pattern to link the view to an API endpoint in `learning_note_app/urls.py`

