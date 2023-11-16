// 导入Firebase的初始化模块和数据库模块
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, set } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
// 导入Firebase认证模块
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9jbkSK-pwpxguJjfMgQe1-BOz8vNLcqA",
  authDomain: "web504-assessment-2-e5b0b.firebaseapp.com",
  databaseURL: "https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web504-assessment-2-e5b0b",
  storageBucket: "web504-assessment-2-e5b0b.appspot.com",
  messagingSenderId: "407996235327",
  appId: "1:407996235327:web:2899af70e826770857c28a"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Obtain the authentication service instance
const auth = getAuth(app);

// Get database example
const database = getDatabase(app);

// Get page element 
const commentText = document.getElementById('enterSection');
const postCommentBtn = document.getElementById('postComment');
const commentsList = document.getElementById('commentsList'); 
const toggleButton = document.getElementById('toggleButton'); 
const editButton = document.getElementById('editButton'); 

// User register function
const registerUser = () => {
  // Get user input
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  
  // Calling Firebase function to register
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert('Registration successful!'))
    .catch(error => alert(`Error: ${error.message}`)); 
};

// User loginfunction
const loginUser = () => {
  // Get user input
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Calling Firebase function to login
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert('Login successful!'))
    .catch(error => alert(`Error: ${error.message}`));
};

// Listen for the post comment button click event
postCommentBtn.addEventListener('click', () => {
  // Check if the current user is logged in
  const user = auth.currentUser;
  
  if (user) {
    // Get and clean the comment text
    const commentValue = commentText.value.trim();

    if (commentValue) {
      // Get a reference to the comments in the database
      const commentsRef = ref(database, 'comments');

      // Push the comment to the database
      push(commentsRef, {
        text: commentValue,
        uid: user.uid,
        email: user.email,
        timestamp: Date.now(),
      })
      .then(() => {
        commentText.value = ''; // Clear the comment box
        alert('Congratulations, your comment has been submitted successfully!');
      })
      .catch(error => console.error('Error posting comment:', error)); 
    }
  } else {
    alert('Please log in first before commenting!');
  }
});

// Listen for the toggle button click event to show or hide the comments section
toggleButton.addEventListener('click', () => {
  const commentSection = document.getElementById('previousComment');

  // Toggle the display state of the comments section
  commentSection.style.display = commentSection.style.display === 'none' || !commentSection.style.display
    ? 'block'
    : 'none';
});

// Listen for real-time changes to the comment data
const commentsRef = ref(database, 'comments');
onValue(commentsRef, snapshot => {
  const comments = snapshot.val(); // Retrieve the comment data

  commentsList.innerHTML = ''; // Clear the existing comments list

  // Create a list item for each comment and add it to the comments list
  Object.values(comments).forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment.text;
    commentsList.appendChild(li); // Add the comment to the list
  });
});

// Listen for the edit button click event
editButton.addEventListener('click', () => {
  // Prompt the user to enter the comment they want to edit
  const userEntryUpdateDate = prompt('Please enter the content of the comment you want to edit!');

  onValue(commentsRef, snapshot => {
    const editData = snapshot.val();
    if (!editData) {
      alert('No data found'); // No data found
      return;
    }

    // Find the key for the comment the user wishes to edit
    const keyToData = Object.keys(editData).find(key => editData[key].text === userEntryUpdateDate);
    
    // If found, prompt the user to enter new comment content
    if (keyToData) {
      const newData = prompt('Please enter the new comment content');
      if (newData) {
        // Get a reference to the specific comment in the database
        const specificUpdateRef = ref(database, `comments/${keyToData}`);
        
        // Update the comment content in the database
        set(specificUpdateRef, {
          text: newData,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          timestamp: Date.now(),
        })
        .then(() => alert('Comment updated successfully!')) 
        .catch(error => alert(`Error updating comment: ${error.message}`)); 
      } else {
        alert('You have canceled the operation or did not enter the edited comment, please try again');
      }
    } else {
      alert('Matching comment not found, please re-enter!');
    }
  });
});