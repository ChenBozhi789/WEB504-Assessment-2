// 导入Firebase库
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9jbkSK-pwpxguJjfMgQe1-BOz8vNLcqA",
    authDomain: "web504-assessment-2-e5b0b.firebaseapp.com",
    databaseURL: "https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web504-assessment-2-e5b0b",
    storageBucket: "web504-assessment-2-e5b0b.appspot.com",
    messagingSenderId: "407996235327",
    appId: "1:407996235327:web:2899af70e826770857c28a"
  };

// Initialize FirebaseConfig
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// 获取页面元素
const commentText = document.getElementById("enterSection");
const postCommentBtn = document.getElementById("postComment");
const commentsList = document.getElementById("commentsList");
const toggleButton = document.getElementById("toggleButton")
const  editButtonButton = document.getElementById("editButton");

function registerUser() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Registration successful!');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Login successful!');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
}

// 点击提交评论按钮
postCommentBtn.addEventListener('click', function() {
    const user = auth.currentUser;
    if (user) {
        const commentValue = commentText.value.trim();
        if (commentValue) {
            const commentsRef = ref(database, 'comments');
            push(commentsRef, { 
                text: commentValue, 
                uid: user.uid, 
                email: user.email, 
                timestamp: Date.now() 
            })
            .then(() => {
                commentText.value = '';  // 清空输入框
                alert("恭喜，您的评论已成功提交！");
            })
            .catch(error => {
                console.error("Error posting comment: ", error);
            });
        }
    } else {
        alert("请先登录再评论！");
    }
});

// 展开/隐藏按钮
toggleButton.addEventListener("click", function() {
    const commentSection = document.getElementById("previousComment");
    if (commentSection.style.display === "none" || commentSection.style.display === "") {
        commentSection.style.display = "block";
    } else {
        commentSection.style.display = "none"
    }
});


// 编辑评论按钮
editButton.addEventListener("click", function() {
    const userEntryUpdateDate = prompt("请输入您要编辑的评论内容！");
    onValue(commentsRef, (snapshot) => {   // 使用之前定义的commentsRef
        const editData = snapshot.val();
        if (!editData) {
            alert("没有找到任何数据");
            return;
        }

        let dataExists = false;
        let keyToData = null;

        for (let key in editData) {   // 使用editData替代updateData
            if (editData[key].text === userEntryUpdateDate) {
                dataExists = true;
                keyToData = key;
                break;
            }
        }

        if (dataExists) {
            const newData = prompt("请输入新的评论内容");
            if (newData) { 
                const specificUpdateRef = ref(database, `comments/${keyToData}`);
                set(specificUpdateRef, { 
                    text: newData, 
                    uid: auth.currentUser.uid, 
                    email: auth.currentUser.email, 
                    timestamp: Date.now() 
                })
                .then(() => {
                    alert("评论更新成功！");
                })
                .catch((error) => {
                    alert(`更新评论时出错: ${error.message}`);
                });
            } else {
                alert("您已取消本次操作或未输入编辑后的评论，请重试");
            }
        } else {
            alert("未找到匹配的评论，请重新输入！");
        }
    });
});

// 实时监听评论数据的变化
const commentsRef = ref(database, 'comments');
onValue(commentsRef, snapshot => {
    const comments = snapshot.val();
    commentsList.innerHTML = '';  // 清空列表

    for (let key in comments) {
        const li = document.createElement('li');
        li.textContent = comments[key].text;
        commentsList.appendChild(li);
    }
});

document.getElementById('registerButton').addEventListener('click', registerUser);
document.getElementById('loginButton').addEventListener('click', loginUser);