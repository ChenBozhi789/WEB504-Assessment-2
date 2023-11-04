// Import the firebase
import { 
    initializeApp 
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
  import { 
    getDatabase, 
    ref, 
    push, 
    onValue 
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
  
  // Initialize Firebase application
  const appSetting = {
    databaseURL: 'https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app/',
  };
  
  const app = initializeApp(appSetting);
  const database = getDatabase(app);
  
  // Get page elements
  const commentText = document.getElementById('enterSection');
  const postCommentBtn = document.getElementById('postComment');
  const commentsList = document.getElementById('commentsList');
  const toggleButton = document.getElementById('toggleButton');
  
  postCommentBtn.addEventListener('click', () => {
    const commentValue = commentText.value.trim();
    if (commentValue) {
      const commentsRef = ref(database, 'comments');
      push(commentsRef, { text: commentValue, timestamp: Date.now() })
        .then(() => {
          commentText.value = ''; // Clear commentText
          alert('Congratulations, your review has been successfully submitted!');
        })
        .catch((error) => {
          console.error('Error posting comment: ', error);
        });
    }
  });
  
  // Monitor changes in comment data in real time
  const commentsRef = ref(database, 'comments');
  onValue(commentsRef, (snapshot) => {
    const comments = snapshot.val();
    commentsList.innerHTML = ''; // Clear list
  
    Object.values(comments).forEach((comment) => {
      const li = document.createElement('li');
      li.textContent = comment.text;
      commentsList.appendChild(li);
    });
  });
  
  // Expand/hide button
  toggleButton.addEventListener('click', () => {
    const commentSection = document.getElementById('previousComment');
    if (!commentSection.style.display || commentSection.style.display === 'none') {
      commentSection.style.display = 'block';
    } else {
      commentSection.style.display = 'none';
    }
  });  