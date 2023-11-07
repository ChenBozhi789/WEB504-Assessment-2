// Import Firebase applications and database modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, set, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

// Configure Settings for the Firebase application
const appSetting = {
  databaseURL: 'https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase app
const app = initializeApp(appSetting);

// Get database example
const database = getDatabase(app);

// Create a reference to inputList in the database
const inputInDB = ref(database, 'inputList');

// Get page element 
const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const readButton = document.getElementById('read-button');
const updateButton = document.getElementById('update-button');
const deleteButton = document.getElementById('delete-button');

// Defines a function to clear the input field
const clearInputField = () => {
  inputField.value = '';
};

// Defines a function that adds input data to a list of pages
const appendInputToInputList = (inputValue) => {
  inputInDB.innerHTML += `<li class="data-item">${inputValue}</li>`;
};

// Set up click event listening for the Add button
addButton.addEventListener('click', () => {
  const inputValue = inputField.value;

  // Push the entered data to the Firebase database
  push(inputInDB, { input: inputValue });

  // Clear the input field and update the list display on the page
  clearInputField();
  appendInputToInputList(inputValue);
  alert('Add data successfully!');
});

// Set up click event listening for the read button
readButton.addEventListener('click', () => {
  alert('Check the console for stored data!');

  // Read data from the Firebase database and print it on the console
  onValue(inputInDB, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
});

// Set up click event listening for the update button
updateButton.addEventListener('click', () => {
  const userEntryUpdateDate = prompt('Please enter the Firebase data you want to update');

// Read data from the Firebase database
  onValue(inputInDB, (snapshot) => {
    const updateData = snapshot.val();

// If the database is empty, a message is displayed indicating no data
    if (!updateData) {
      alert('No data in the database');
      return;
    }

    let dataExists = false;
    let keyToData = null;

// Traverse the data in the database to find matching data
    Object.keys(updateData).forEach((key) => {
      if (updateData[key].input === userEntryUpdateDate) {
        dataExists = true;
        keyToData = key;
      }
    });

// If matching data is found, new data is requested for update
    if (dataExists) {
      const newData = prompt('Please enter new data');
      if (newData) {
        const specificUpdateRef = ref(database, `inputList/${keyToData}`);

        // Update the data from datebase
        set(specificUpdateRef, { input: newData })
          .then(() => {
            alert('Data update success!');
          })
          .catch((error) => {
            alert(`Error updating data: ${error.message}`);
          });
      } else {
        alert('You cancelled the operation or did not enter new data, please try againv');
      }
    } else {
      alert('No matching data found, please re-enter!');
    }
  });
});

// Set a click event listener for the delete button
deleteButton.addEventListener('click', () => {
  const deleteData = prompt('Please enter the data you wish to delete from Firebase');
  if (!deleteData) {
    return;
  }

  // Read data from the Firebase database
  onValue(inputInDB, (snapshot) => {
    const data = snapshot.val();
    let dataExists = false;
    let keyToData = null;

    // Loop through the data in the database to find the matching data entry
    Object.keys(data).forEach((key) => {
      if (data[key].input === deleteData) {
        dataExists = true;
        keyToData = key;
      }
    });

    // If a matching data entry is found, prompt the user to confirm the deletion
    if (dataExists) {
      const confirmDeletion = confirm('Are you sure you want to delete this data?');
      if (confirmDeletion) {
        const specificDataRef = ref(database, `inputList/${keyToData}`);

        // Delete the data from the database
        remove(specificDataRef)
          .then(() => {
            alert('Data deleted successfully!');
          })
          .catch((error) => {
            alert(`Failed to delete data: ${error.message}`);
          });
      }
    } else {
      alert('No such data found in the database.');
    }
  });
});
