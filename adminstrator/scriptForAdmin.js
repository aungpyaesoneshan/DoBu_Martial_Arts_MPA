// Global variable to store the index of the edited data
var editIndex = -1;//This global variable is very important without this Create and Edit (Update) won't work and it define whether create new data or updating the existing data


// Function to load data
function loadData() {
  // Function to display the stored data in the table
  const storedData = JSON.parse(localStorage.getItem('formData'));
  const tbody = $('.data-table tbody').empty();

  if (storedData && storedData.length > 0) {
    // creating table row datas from the local storage array of obj
    $.each(storedData, function (index, obj) {
      const row = `
        <tr>
          <td>${obj.name}</td>
          <td>${obj.email}</td>
          <td>${obj.age}</td>
          <td>${obj.gender}</td>
          <td>${obj.phone}</td>
          <td>${obj.address}</td>
          <td>${obj.classOption}</td>
          <td>
            <button class="edit" onclick="editData(${index})">Edit</button>
            <button class="delete" onclick="deleteData(${index})">Delete</button>
          </td>
        </tr>
      `;
      tbody.append(row);
    });
  } else {
    const message = $('<tr>').append($('<td colspan="7">').text('No data available.'));
    tbody.append(message);
  }
}

$(document).ready(function () {
  // Load data from local storage
  loadData();
});

// Create data function
function createData() {
  // Get form values
  var name = $("#name").val();
  var email = $("#email").val();
  var age = $("#age").val();
  var gender = $("#gender").val();
  var phone = $("#phone").val();
  var address = $("#address").val();
  var classOption = $("input[name='class[]']:checked").map(function() {
    return $(this).val();
  }).get();

 // form validator
if (name === '' || !(isNaN(name))) {
  alert("Name is required and should not include characters");
  return;
}

if (isNaN(age) || age < 5) {
  alert("Invalid age. Age must be a number and greater than 5");
  return;
}

if (gender === '') {
  alert("Gender is required");
  return;
}

if (isNaN(phone) || phone.length < 9) {
  alert("Phone number must contain only numbers and the length should be 9 digits");
  return;
}

if (classOption === null||classOption.length === 0) {
  alert("Please select at least one class");
  return;
}

  // Create the form data object
  var formData = {
    name: name,
    email: email,
    age: age,
    gender: gender,
    phone: phone,
    address: address,
    classOption: classOption
  };

  // Retrieve existing form data from localStorage
  var existingData = JSON.parse(localStorage.getItem('formData')) || [];

  if (editIndex === -1) {
    // Add new form data to existing data array
    existingData.push(formData);
  } else {
    // Update existing form data at the specified index
    existingData[editIndex] = formData;
  }

  // Store the updated data in localStorage
  localStorage.setItem('formData', JSON.stringify(existingData));

  // Load the updated data in the table
  loadData();

  // Clear the input fields
  $("#name").val('');
  $("#email").val('');
  $("#age").val('');
  $("#gender").val('');
  $("#phone").val('');
  $("#address").val('');
  $("#class").val('');

  // Reset the editIndex to -1
  editIndex = -1;
}

// Delete data function
function deleteData(index) {
  // Retrieve existing form data from localStorage
  var existingData = JSON.parse(localStorage.getItem('formData')) || [];

  // Remove data at the specified index
  existingData.splice(index, 1);

  // Store the updated data in localStorage
  localStorage.setItem('formData', JSON.stringify(existingData));

  // Load the updated data in the table
  loadData();
}

// Edit data function
function editData(index) {
  
  // Retrieve existing form data from localStorage
  var existingData = JSON.parse(localStorage.getItem('formData')) || [];

  // Populate the input fields with the existing data at the specified index
  var formData = existingData[index];
  $("#name").val(formData.name);
  $("#email").val(formData.email);
  $("#age").val(formData.age);
  $("#gender").val(formData.gender);
  $("#phone").val(formData.phone);
  $("#address").val(formData.address);
  $("#class").val(formData.classOption);

  // Set the editIndex to the specified index
  editIndex = index;

}

// Event listener for the Update button
$("#update-btn").click(function () {
  // Call the createData function to update the edited data
  createData();

});
