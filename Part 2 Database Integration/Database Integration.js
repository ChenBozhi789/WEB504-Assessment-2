// import the necessary Firebase templates using the import keyword
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Define your Firebase app's configuration
const appSetting = {
    databaseURL: "https://web504-as2-45ff3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize the Firebase app
const app = initializeApp(appSetting);

// Get database instance
const database = getDatabase(app);

// Define an "inputList" path that refers to the database
const inputInDB = ref(database, "inputList");

/*
onValue(inputInDB, function(snapshot) {
    let inputArray = Object.values(snapshot.val());
    clearInputList();
    for(let i = 0; i < inputArray.length; i++) {
        let currentInput = inputArray[i];
        console.log(currentInput);
        appendInputToInputList(currentInput.input);
    }
})
*/
// Get page elements
const inputfield = document.getElementById("input-field");
const inputList = document.getElementById("inputlist");
const updatefield = document.getElementById("update-field");

const addButton = document.getElementById("add-button");
const readButton = document.getElementById("read-button");
const updateButton = document.getElementById("update-button");
const deleteButton = document.getElementById("delete-button");

addButton.addEventListener('click', function() {
    let inputvalue = inputfield.value;
    push(inputInDB, { input: inputvalue });
    clearInputField();
    appendInputToInputList(inputvalue);
    alert('You have successfully clicked the button');
});

readButton.addEventListener("click", function() {
    alert("Please go to the console to view the stored data!")
    onValue(inputInDB, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    })
})

updateButton.addEventListener("click", function() {
    const userEntryUpdateDate = prompt("请输入您希望从Firebase更新的数据");
    onValue(inputInDB, (snapshot) => {
        const updateData = snapshot.val();
        if (!updateData) {
            alert("没有找到任何数据");
            return;
        }

        let dataExists = false;
        let keyToData = null;

        for (let key in updateData) {
            if (updateData[key].input === userEntryUpdateDate) {
                dataExists = true;
                keyToData = key;
                break;
            }
        }

        if (dataExists) {
            const newData = prompt("输入想要更新的新数据");
            if (newData) { 
                const specificUpdateRef = ref(database, `inputList/${keyToData}`);
                set(specificUpdateRef, { input: newData })
                    .then(() => {
                        alert("数据更新成功！");
                    })
                    .catch((error) => {
                        alert(`更新数据时出错: ${error.message}`);
                    });
            } else {
                alert("您已取消本次操作或未输入更新后数据，请重试");
            }
        } else {
            alert("未找到匹配的数据，请重新输入！");
        }
    });
});

deleteButton.addEventListener("click", function() {
    const deleteData = prompt("请输入您想要从Firebase删除的数据");

    if (!deleteData) {
        return;
    }

    onValue(inputInDB, (snapshot) => {
        const data = snapshot.val();

        let dataExists = false;
        let keyToData = null;

        for (let key in data) {
            if (data[key].input === deleteData) {
                dataExists = true;
                keyToData = key;
                break;
            }
        }

        if (dataExists) {
            const confirmDeletion = confirm("您确定要删除这条数据吗？");
            if (confirmDeletion) {
                const specificDataRef = ref(database, `inputList/${keyToData}`);
                remove(specificDataRef)
                .then(() => {
                    alert('数据删除成功！');
                })
                .catch((error) => {
                    alert(`删除数据失败: ${error.message}`);
                });
            }
        } else {
            alert("您要删除的数据在数据库中未找到。");
        }
    });
});

function clearInputField() {
    inputfield.value = "";
}

function appendInputToInputList(inputvalue) {
    inputList.innerHTML += `<li class="data-item">${inputvalue}</li>`;
}
