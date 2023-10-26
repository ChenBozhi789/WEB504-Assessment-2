// 导入Firebase库
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// 初始化Firebase应用
const appSetting = {
    databaseURL: "https://comments-section-16278-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSetting);
const database = getDatabase(app);

// 获取页面元素
const commentText = document.getElementById("commentText");
const postCommentBtn = document.getElementById("postComment");
const commentsList = document.getElementById("commentsList");
const toggleButton = document.getElementById("toggleButton")

postCommentBtn.addEventListener('click', function() {
    const commentValue = commentText.value.trim();
    if (commentValue) {
        const commentsRef = ref(database, 'comments');
        push(commentsRef, { text: commentValue, timestamp: Date.now() })
            .then(() => {
                commentText.value = '';  // 清空输入框
                alert("恭喜，您的评论已成功提交！")
            })
            .catch(error => {
                console.error("Error posting comment: ", error);
            });
    }
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

// 展开/隐藏按钮
toggleButton.addEventListener("click", function() {
    const commentSection = document.getElementById("previousComment");
    if (commentSection.style.display === "none" || commentSection.style.display === "") {
        commentSection.style.display = "block";
    } else {
        commentSection.style.display = "none"
    }
});