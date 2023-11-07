# WEB504-Assessment-2

The purpose of this assessment is to learn the basics of Firebase and integrate it with a web application developed using JavaScript and CSS.

## Getting Started

This section describes how to obtain a copy of this project for development and testing purposes.

## Features

Data Storage: Utilizes Firebase's built-in real-time database feature for storing and retrieving data.
User Authentication: Implements user registration and login functionality using Firebase's authentication services.

## Prerequisites

The following conditions must be met for the development of this project:
- **JavaScript**: A scripting language for implementing basic functionality and interactive features on the page.
- **CSS**: For defining the style and appearance of the page.
- **Firebase**: Offers a suite of backend services and tools to enhance development efficiency.

## Decision Background

- **Choosing Firebase**: Firebase was chosen because it's a comprehensive development platform that offers a wide array of readily available tools and services, allowing me to focus on front-end development without worrying about building and maintaining backend systems.

## Code Style

- This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Instructions for Use

### Part 2
- Add Data: Enter the desired content in the input box and click the "Upload" button to upload the data to the Firebase real-time database.
- Review Data: Click the "Read" button to view all data in the real-time database from the console.
- Update Data: Click the "Update" button, enter the data you want to update in the prompted input box, enter the updated data, and confirm. The new data will replace the old data, and the data in the real-time database will also be updated.
- Delete Data: Click the "Delete" button, enter the data you want to delete in the prompted input box, and confirm. This will remove the specified data from the real-time database.

### Part 3
- Enter Comments: Enter your comments in the text input box on the interface.
- Post Comments: Ensure there is content entered in the text input box, then click the "Post Comment" button to publish the comment and upload it to the real-time database.
- View Posted Comments: Click the "View Comments" button to see the comments that have been posted.

### Part 4
- User Registration: Users complete registration by entering a valid email and password and clicking the "Register" button.
- User Login: Users log in by entering the email and password registered with and clicking the "Login" button.
- Post Comments: Enter comment content in the input box and click the "Post" button to publish the comment.
- View Comments: Click the button to view past comments.
- Edit Comments: Enter the existing comment and the edited comment in the prompt box, then confirm to update the comment.

## Known Issues

### Part 2

- **Data Update Issue**: When updating data, users receive a "No matching data found, please re-enter!" message, even though the data has actually been updated.
- **Data Deletion Issue**: When deleting data, despite the data being removed from the database, users still receive a "No matching data found, please re-enter!" message.

### Part 3
Currently functioning normally.

### Part 4

- Users can post comments even without registering or logging in.
- Currently unable to edit specific user comments.

## To-Do Items

- [ ] Fix data update and deletion issues in Part 2.
- [ ] Implement functionality for users to post and edit comments after registering and logging in.

## Development Log

### October 23, 2023 - Project Launch
- Chose Firebase as the backend service.
- Initially determined the layout of the application's user interface.

### October 25, 2023 - Integration of Firebase into the Program
- Introduced Firebase SDK, integrated Firebase real-time database and authentication services.

### October 28, 2023 - Basic Functionality of Part 2 Completed
- Designed four functional buttons corresponding to "CRUD" operations that users can perform on the database.

### October 28, 2023 - Basic Functionality of Part 3 Completed
- Basic functionality of Part 3 implemented.

### October 30, 2023 - Basic Functionality of Part 4 Completed
- Basic functionalities related to user registration, login, and commenting in Part 4 have been implemented, but lack identity verification and the ability to edit specific user comments.

## Functional Testing Verification Log

### Part 2 - Data Operations

#### Adding Data
- **Test Case**: Enter text and click the "Upload" button.
- **Expected Result**: Text should be added to the database and displayed on the user interface.
- **Actual Result**: Test successful. The add data functionality is working correctly, and the text content can be viewed in the database.

#### Updating Data
- **Test Case**: Update an existing data entry.
- **Expected Result**: The data entry should be updated, and the display on the user interface should prompt a data update.
- **Actual Result**: Test successful. The update data functionality is working correctly, and both text content and database data have been updated successfully.

### Part 3 - User Comments

#### Posting Comments
- **Test Case**: Enter comment content and click the "Post Comment" button.
- **Expected Result**: Comments are posted normally and can be found in the database.
- **Actual Result**: Test successful. The post comment functionality is working correctly.

#### Viewing Comments
- **Test Case**: Click the "View Comments" button.
- **Expected Result**: Past posted comments should be viewable below.
- **Actual Result**: Test successful. The view comments functionality is working correctly.

### Part 4 - User Authentication

#### User Registration
- **Test Case**: Register a new user.
- **Expected Result**: The new user should register successfully and be able to log in and comment.
- **Actual Result**: Test successful. The new user can register and use the comment function.

#### User Login
- **Test Case**: Log in with existing user information.
- **Expected Result**: The user should be able to log in successfully.
- **Actual Result**: Test successful. The login functionality is working as expected.

#### Posting Comments
- **Test Case**: Enter comment content and click the "Post Comment" button.
- **Expected Result**: Comments are posted normally and can be found in the database.
- **Actual Result**: Test successful. The post comment functionality is working correctly.

#### Viewing Comments
- **Test Case**: Click the "View Comments" button.
- **Expected Result**: Past posted comments should be viewable below.
- **Actual Result**: Test successful. The view comments functionality is working correctly.

## Additional Resources
- [Firebase Official Documentation - Getting Started](https://firebase.google.com/docs/web/setup) - Learn how to add Firebase to your JavaScript project.
- [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database/web/start) - Understand how to use Firebase Realtime Database in your web application.
