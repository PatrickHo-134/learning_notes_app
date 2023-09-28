This is the repo for the frontend of my project **Learning Notes App**

# How to build this project

## 1. Create React app
Run this command
```
npx create-react-app frontend
```

Install required dependencies

```
npm install axios react-redux redux redux-thunk
```

## 2. Create first React component - Learning Notes
Create 3 folders in src folder: actions, components and reducers

Firstly, create the learningNoteActions.js file in the actions folder to handle the actions related to learning notes.

Next, in `src/components`, create 2 components in: `src/components/LearningNoteList.js` and `src/components/AddLearningNoteModal.js`.

Add those 2 components to `App.js`

## 3. Set Up Redux Store:
Create Redux actions and reducers to manage the global state for your app. For example, you can have actions for fetching learning notes from the backend, and reducers to update the state accordingly.

Firstly, create Redux's store and pass it to the `Provider` component created in the next step. (Note: to resolve issue with Redux/s `createStore` being deprecated, refer to question 2 in *Questions* section)

The `react-redux`'s `Provider` component is responsible for providing the Redux store to the components. You need to wrap entire application with the Provider component in the `index.js` file

## 4. Create the Redux reducers for the Learning Notes feature
In the src/reducers directory, create a new file called `learningNoteReducer.js`

Add this reducer with other reducers in the `src/reducers/index.js` file

Note: At the moment, we can create mock data for the UI to display Learning Notes list as the frontend is still not able to send requests to the backend yet.

(To allow frontend to make successful requests to backend, we need to configure Django backend to include the Access-Control-Allow-Origin header in its responses, allowing requests from the frontend domain (http://localhost:3000).)

## 5. Create **LearningNoteCard.js** to display the information of a single learning note.
We'll add the user's name, date created, title, content, and date updated (if available) to the card.
We use `moment` package to format the date strings (created_at and updated_at) to a more human-readable format.

```
npm install moment
```

### Install `reactstrap` to add styles to UI components
Run this code
```
npm install reactstrap bootstrap

```

### Adding style to the component
Create a new file called **LearningNoteCard.css** in the **src/components** directory and define a CSS class for learning-note-card

## 6. Create **AddLearningNoteModal.js** in the **src/components**
In this part, we need to install package `react-icons` to render some icons in our components.
```
npm install react-icons
```

Install Material-UI package to build modal.

```
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Create a button and a modal for adding new notes in `AddLearningNoteModal.js`
Add the authentication token in the request headers
```
const response = await fetch('http://localhost:8000/api/learning_notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
      },
      body: JSON.stringify(newNoteData),
    });
```

Add `AddLearningNoteModal` component to **LearningNoteList.js**

**Up till this point, the frontend can pop up a modal with input form to add a new learning note but the backend doesn't accept the request because the application requires users to log in. However, user login feature is not implemented yet so form submission won't work for now. If the backend sets permission class to `AllowAny`, we still see a list of learning notes displayed. If permission class is set to `IsAuthenticated`, the UI will display nothing.**

## 7. Implement user login feature
- Create `LandingPage` component in **src/components/LandingPage.js** so users are redirected to this page if they're not logged in.
- Create `LoginModal` component in **src/components/LoginModal.js**
- Create the **authActions.js** file in the **src/actions** directory for handling user login.
- In **src/App.js** file, add routes to your main App component. You'll need to install `react-router-dom` if it's not installed yet.
     ```
     npm install react-router-dom
     ```

## 8. Implement feature for archiving notes
- In **LearningNoteCard.js**, we use IconButton from Material-UI to create the meatballs menu icon with options `archive` and `edit` a learning note.
- In **learningNoteActions.js**, create `archiveLearningNote` action for archiving a learning note
- In **learningNoteReducer.js**, update `learningNoteReducer` by adding actions of archiving notes.

## 9. Implement feature for updating notes
- Create the `EditLearningNoteModal` component. This component is similar to `AddLearningNoteModal` component
- Update the **LearningNoteCard.js** component to add an "Edit" button and handle the opening of the `EditLearningNoteModal`
- Create the `updateLearningNote` action in **learningNoteActions.js** file to send a request to the backend to update the learning note's title and content
- Import action types related to updating a learning note in **learningNoteReducer.js**

## 10. Add feature to delete notes
- This is straightforward and similar to archiving note

## 11. Implement a rich text editor for the content of learning notes
- Install `react-quill`
- Import and use `react-quill` in **AddLearningNoteModal.js**, **EditLearningNoteModal.js** and **LearningNoteCard.js**
- In **LearningNoteCard.js**, use `dangerouslySetInnerHTML` to display the content `LearningNoteCard`
- Add style for ReactQuill components in **src/App.css**

## 12. Update frontend to work with new authentication mechanism
- Add `userLogin` to Redux's `store`
- Rename **authAction.js** to **userActions.js**
- Create `userLoginReducer` in **userReducer.js**
- Add `userLogin` to `rootReducer` in **reducers/index.js**
- Add **Loader.js** and **Message.js** components
- Fix `fetchLearningNote` function to only fetch learning notes of an authenticated user.

## 13. Add NavBar and convert Login/Register modal to page
- Create a new component `NavBar` in **NabBar.js**
- Add `Login`, `Logout` and `Register` button to the NavBar
- Add `logout` action in **userActions.js**
- Display username if user is logged in
- Convert `Login` modal to `Login` page
- Convert `Register` modal to `Register` page
- Remove `Login` and `Register` modal from **LandingPage.js**
- Add `register` action in **userActions.js**
- Add `path` for Login and Register page in **App.js**
- Create `userRegisterReducer` in **userReducer.js**
- Update `learningNoteReducer` to remove learning notes data when user logs out and set up initial state when user registers successfully.
- Add `userRegisterReducer` to `rootReducer`


# Questions:
## 1. How to fix issue with 'Insufficient permissions' in VSCode?
Run this command

```
sudo chown -R patrick frontend
```

## 2. How to handle the issue with Redux's `createStore` being deprecated?
It is recommended to use the configureStore method from @reduxjs/toolkit, which is the official package for efficient Redux setup and includes several useful utilities.
- Install `@reduxjs/toolkit`
     ```
     npm install @reduxjs/toolkit
     ```
- Create the Redux store using `configureStore`

## 3. How to resolve issue with Mac constantly asking for permission to install new packages?
Run this command
```
sudo chown -R 501:20 "/Users/patrick/.npm"
```