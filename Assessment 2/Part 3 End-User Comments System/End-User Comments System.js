// Import Firebase applications and database modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

// Initialize the Firebase application Settings
const appSetting = {
  databaseURL: 'https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase app
const app = initializeApp(appSetting);

// Get database example
const database = getDatabase(app);

// Get page element 
const commentText = document.getElementById('enterSection'); 
const postCommentBtn = document.getElementById('postComment'); 
const commentsList = document.getElementById('commentsList');
const toggleButton = document.getElementById('toggleButton'); 

// Add a click event listener to the comment button
postCommentBtn.addEventListener('click', () => {
  const commentValue = commentText.value.trim(); // Get the comment input box
  if (commentValue) { 
    const commentsRef = ref(database, 'comments'); // Gets a node reference in the database

    // Push the comment content and timestamp to the database
    push(commentsRef, { text: commentValue, timestamp: Date.now() })
      .then(() => {
        commentText.value = ''; // Clear the comment input box
        alert('Congratulations, your review has been successfully submitted!');
      })
      .catch((error) => {
        console.error('Error Posting a comment:', error); 
      });
  }
});

// Real-time monitoring of comments data changes in the database
const commentsRef = ref(database, 'comments'); // Gets a node reference in the database

onValue(commentsRef, (snapshot) => {
  const comments = snapshot.val(); // Get comment data

  commentsList.innerHTML = ''; // Clear comment list

  // Iterate over all the comment data and add it to the comment list for display
  Object.values(comments).forEach((comment) => {
    const li = document.createElement('li'); // Create a list item element
    li.textContent = comment.text; // Set the list item text content to the comment content
    commentsList.appendChild(li); // Adds the list item to the comment list
  });
});

// Add a click event listener for the expand/Hide comment list button
toggleButton.addEventListener('click', () => {
  const commentSection = document.getElementById('previousComment'); // Get comment part element

  // Toggle the display status of the comments section
  if (!commentSection.style.display || commentSection.style.display === 'none') {
    commentSection.style.display = 'block'; // Displays if currently hidden
  } else {
    commentSection.style.display = 'none'; // If currently displayed, hide
  }
});