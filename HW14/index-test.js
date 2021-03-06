// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadMoreBtn.addEventListener("click", handleButtonClick);

// Set sliced ufoData.js to newData variable initially
var newData = dataSet.slice(0, 50);

// Set filteredAddresses to dataSet initially
var filteredAddresses = dataSet;

//Create variable for displaying 50 items
var resultsPerPage = 50;

//handleButtonClick Function for loading more data
function handleButtonClick() {
  if (filteredAddresses) {
    resultsPerPage += filteredAddresses.length;
  } else {
    resultsPerPage += 50;
  }
  var startingIndex = resultsPerPage - 50 + 1;
  var nextData = dataSet.slice(startingIndex, resultsPerPage);
  newData = dataSet.concat(nextData);

  renderTable();
}

// renderTable renders the filteredData to the tbody
function renderTable(filteredData) {
  if (filteredData) {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredData.length; i++) {
      // Get get the current filteredData object and its fields
      var address = filteredAddresses[i];
      var fields = Object.keys(address);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the data object, create a new cell at set its inner text to be the current value at the current data field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = data[field];
      }
    }
  } else {
    $tbody.innerHTML = "";
    for (var i = 0; i < newData.length; i++) {
      // Get get the current filteredData object and its fields
      var address = newData[i];
      var fields = Object.keys(data);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the data object, create a new cell at set its inner text to be the current value at the current data field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = data[field];
      }
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDatetime = $datetimeInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

 // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  filteredAddresses = dataSet.filter(function(address) {
    var addressDatetime = address.datetime.substring(0, filterDatetime.length).toLowerCase();
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    var addressCountry = address.country.substring(0, filterCountry.length).toLowerCase();
    var addressShape = address.shape.substring(0, filterShape.length).toLowerCase();
  
    if (addressDatetime === filterDatetime && addressState === filterState && addressCity === filterCity && addressCountry === filterCountry && addressShape === filterShape) {
      return true;
    }
    return false;
  });
renderTable();
}


// Render the table for the first time on page load
renderTable();
