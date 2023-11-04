import {
    initializeApp
  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
  
  import {
    getDatabase, ref, push, onValue, set, remove
  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
  
  // Firebase app configuration
  const appSetting = {
    databaseURL: 'https://web504-assessment-2-e5b0b-default-rtdb.asia-southeast1.firebasedatabase.app',
  };
  
  const app = initializeApp(appSetting);
  const database = getDatabase(app);
  const inputInDB = ref(database, 'inputList');
  
  const inputField = document.getElementById('input-field');
  const addButton = document.getElementById('add-button');
  const readButton = document.getElementById('read-button');
  const updateButton = document.getElementById('update-button');
  const deleteButton = document.getElementById('delete-button');
  
  const clearInputField = () => {
    inputField.value = '';
  };
  
  const appendInputToInputList = (inputValue) => {
    inputInDB.innerHTML += `<li class="data-item">${inputValue}</li>`;
  };
  
  addButton.addEventListener('click', () => {
    const inputValue = inputField.value;
    push(inputInDB, { input: inputValue });
    clearInputField();
    appendInputToInputList(inputValue);
    alert('You have successfully clicked the button');
  });
  
  readButton.addEventListener('click', () => {
    alert('Please go to the console to view the stored data!');
    onValue(inputInDB, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  });
  
  updateButton.addEventListener('click', () => {
    const userEntryUpdateDate = prompt('Please enter the data you want to update from Firebase');
    onValue(inputInDB, (snapshot) => {
      const updateData = snapshot.val();
      if (!updateData) {
        alert('No data found');
        return;
      }
  
      let dataExists = false;
      let keyToData = null;
  
      Object.keys(updateData).forEach((key) => {
        if (updateData[key].input === userEntryUpdateDate) {
          dataExists = true;
          keyToData = key;
        }
      });
  
      if (dataExists) {
        const newData = prompt('Enter the new data you want to update');
        if (newData) {
          const specificUpdateRef = ref(database, `inputList/${keyToData}`);
          set(specificUpdateRef, { input: newData })
            .then(() => {
              alert('Data update success!');
            })
            .catch((error) => {
              alert(`Error updating data:${error.message}`);
            });
        } else {
          alert('You have cancelled this operation or did not enter updated data, please try again');
        }
      } else {
        alert('No matching data found, please re-enter!');
      }
    });
  });
  
  deleteButton.addEventListener('click', () => {
    const deleteData = prompt('Please enter the data you want to delete from Firebase');
    if (!deleteData) {
      return;
    }
  
    onValue(inputInDB, (snapshot) => {
      const data = snapshot.val();
      let dataExists = false;
      let keyToData = null;
  
      Object.keys(data).forEach((key) => {
        if (data[key].input === deleteData) {
          dataExists = true;
          keyToData = key;
        }
      });
  
      if (dataExists) {
        const confirmDeletion = confirm('Are you sure you want to delete this data?');
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
        alert('The data you want to delete was not found in the database.');
      }
    });
  });
  