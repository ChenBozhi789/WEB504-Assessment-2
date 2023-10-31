// import the necessary Firebase templates using the import keyword
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Define your Firebase app's configuration
const appSetting = {
    databaseURL: "https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app"
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
    const userEntryUpdateDate = prompt("Please enter the data you want to update from Firebase");
    onValue(inputInDB, (snapshot) => {
        const updateData = snapshot.val();
        if (!updateData) {
            alert("No data found");
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
            const newData = prompt("Enter the new data you want to update");
            if (newData) { 
                const specificUpdateRef = ref(database, `inputList/${keyToData}`);
                set(specificUpdateRef, { input: newData })
                    .then(() => {
                        alert("Data update success!");
                    })
                    .catch((error) => {
                        alert(`Error updating data:${error.message}`);
                    });
            } else {
                alert("You have cancelled this operation or did not enter updated data, please try again");
            }
        } else {
            alert("No matching data found, please re-enter!");
        }
    });
});

deleteButton.addEventListener("click", function() {
    const deleteData = prompt("Please enter the data you want to delete from Firebase");

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
            const confirmDeletion = confirm("Are you sure you want to delete this data?");
            if (confirmDeletion) {
                const specificDataRef = ref(database, `inputList/${keyToData}`);
                remove(specificDataRef)
                .then(() => {
                    alert('Data deletion succeeded!');
                })
                .catch((error) => {
                    alert(`Failed to delete data: ${error.message}`);
                });
            }
        } else {
            alert("The data you want to delete was not found in the database.");
        }
    });
});

function clearInputField() {
    inputfield.value = "";
}

function appendInputToInputList(inputvalue) {
    inputInDB.innerHTML += `<li class="data-item">${inputvalue}</li>`;
}