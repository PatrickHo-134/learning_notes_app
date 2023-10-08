# Learning Notes App
------------------

The Learning Notes App is a full-stack web application designed to help users create and manage their learning notes and flashcards. It allows users to keep track of what they've learned and review their notes conveniently. This README provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents
- Getting Started
    + Prerequisites
    + Installation
- Usage
    + Authentication
    + Creating learning notes
    + Viewing learning notes
    + Archiving and editing learning notes
    + Push notification to revise knowledge
- Contributing
- License

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Python and Django installed.
- PostgreSQL database set up and configured.

### Installation
1. Clone the repository:

```bash
git clone https://github.com/PatrickHo-134/learning_notes_app
cd learning-notes-app
```

2. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Set up the PostgreSQL database:

Create a PostgreSQL database and configure the connection settings in backend/settings.py.

4. Run backend migrations:

```bash
python manage.py migrate
```

5. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

6. Start the frontend development server:

```bash
npm start
```

7. Start the Django development server:

```bash
cd ../backend
python manage.py runserver
```

8. Access the app in your web browser at http://localhost:3000.

## Usage

### Authentication
- Users can sign up for an account or log in if they already have one.
- Authentication is required to create and manage learning notes.

### Creating Learning Notes
- Once logged in, users can create new learning notes.
- Each learning note includes a title, content, and a date created.
- Optionally, users can set the date created.

### Viewing Learning Notes
- Users can view their list of learning notes on the "Timeline" page.
- Learning notes are displayed in a card format, showing the title, content, and creation date.
- Archived notes are visually distinguished.

### Archiving and Editing Learning Notes
- Users can archive a learning note to mark it as complete.
- Users can edit a learning note's title and content by clicking the "Edit" button.

### Push Notifications to Revise Knowledge
- Users can set a time period after creating a learning note to remind/revise the knowledge they learned.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License
This project is licensed under the MIT License.
