// 导入Firebase库
import {
    initializeApp
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
  import {
    getDatabase,
    ref,
    push,
    onValue,
    set
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
  
  const firebaseConfig = {
    apiKey: 'AIzaSyA9jbkSK-pwpxguJjfMgQe1-BOz8vNLcqA',
    authDomain: 'web504-assessment-2-e5b0b.firebaseapp.com',
    databaseURL: 'https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'web504-assessment-2-e5b0b',
    storageBucket: 'web504-assessment-2-e5b0b.appspot.com',
    messagingSenderId: '407996235327',
    appId: '1:407996235327:web:2899af70e826770857c28a',
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  
  const commentText = document.getElementById('enterSection');
  const postCommentBtn = document.getElementById('postComment');
  const commentsList = document.getElementById('commentsList');
  const toggleButton = document.getElementById('toggleButton');
  const editButton = document.getElementById('editButton');
  
  const registerUser = () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert('Registration successful!'))
      .catch(error => alert(`Error: ${error.message}`));
  };
  
  const loginUser = () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert('Login successful!'))
      .catch(error => alert(`Error: ${error.message}`));
  };
  
  postCommentBtn.addEventListener('click', () => {
    const user = auth.currentUser;
    if (user) {
      const commentValue = commentText.value.trim();
      if (commentValue) {
        const commentsRef = ref(database, 'comments');
        push(commentsRef, {
          text: commentValue,
          uid: user.uid,
          email: user.email,
          timestamp: Date.now(),
        })
        .then(() => {
          commentText.value = '';
          alert('Congratulations, your comment has been submitted successfully!');
        })
        .catch(error => console.error('Error posting comment:', error));
      }
    } else {
      alert('Please log in first before commenting!');
    }
  });
  
  toggleButton.addEventListener('click', () => {
    const commentSection = document.getElementById('previousComment');
    commentSection.style.display = commentSection.style.display === 'none' || !commentSection.style.display
      ? 'block'
      : 'none';
  });
  
  const commentsRef = ref(database, 'comments');
  onValue(commentsRef, snapshot => {
    const comments = snapshot.val();
    commentsList.innerHTML = '';
  
    Object.values(comments).forEach(comment => {
      const li = document.createElement('li');
      li.textContent = comment.text;
      commentsList.appendChild(li);
    });
  });
  
  editButton.addEventListener('click', () => {
    const userEntryUpdateDate = prompt('Please enter the content of the comment you want to edit!');
    onValue(commentsRef, snapshot => {
      const editData = snapshot.val();
      if (!editData) {
        alert('No data found');
        return;
      }
  
      const keyToData = Object.keys(editData).find(key => editData[key].text === userEntryUpdateDate);
  
      if (keyToData) {
        const newData = prompt('Please enter the new comment content');
        if (newData) {
          const specificUpdateRef = ref(database, `comments/${keyToData}`);
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
  
  document.getElementById('registerButton').addEventListener('click', registerUser);
  document.getElementById('loginButton').addEventListener('click', loginUser);  