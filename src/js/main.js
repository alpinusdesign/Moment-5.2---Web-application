"use strict";

// API-URL.
const url = "http://alpinusdesign.se/DT173G/moment%205.1/index.php";

/* ============= */
/* = Variables = */
/* ============= */
/* - Form-container navigation buttons - */
const createToggleEl = document.getElementById("createToggle");
const updateToggleEl = document.getElementById("updateToggle");
const deleteToggleEl = document.getElementById("deleteToggle");

/* - Forms - */
const createFormEl = document.getElementById("createForm");
const updateFormEl = document.getElementById("updateForm");
const deleteFormEl = document.getElementById("deleteForm");

/* - Form inputs - */
/* - Create-form inputs - */
const createCodeEl = document.getElementById("createCode");
const createNameEl = document.getElementById("createName");
const createProgressionEl = document.getElementById("createProgression");
const createSyllabusEl = document.getElementById("createSyllabus");
/* - Update-form inputs - */
const updateCodeEl = document.getElementById("updateCode");
const updateNameEl = document.getElementById("updateName");
const updateProgressionEl = document.getElementById("updateProgression");
const updateSyllabusEl = document.getElementById("updateSyllabus");
/* - Delete-form inputs - */
const deleteCodeEl = document.getElementById("deleteCode");

/* - Table body - */
const courseListEl = document.getElementById("courseTableBody");

/* ============= */
/* = Functions = */
/* ============= */

// Prints the course data to the table and the select-elements.
function displayCourses(courses) {
  courseListEl.innerHTML = ""; // Empty the table-body element.
  updateCodeEl.innerHTML = ""; // Reset the update-form's select element.
  deleteCodeEl.innerHTML = ""; // Reset the delete-form's select element.

  courses.forEach(course => {
    /* - Update table - */
    courseListEl.insertRow(); // Add new row to table.

 
    // Insert row data.
    courseListEl.lastChild.innerHTML = "<td>" + course.Code + "</td>" +
    "<td>" + course.Name + "</td>" +
    "<td>" + course.Progression + "</td>";

    // Append syllabus-link to table row if it contains data.
    if(course.SyllabusURL)
    {
      courseListEl.lastChild.innerHTML += "<td><a href=" + course.SyllabusURL + " target='_blank'>Länk till kursplan</a></td>";
    }

    /* - Update the update form's select element. */
    updateCodeEl.innerHTML +=
      "<option value" + course.Code + ">" + course.Code + "</option>";

    /* - Update the delete form's select element. */
    deleteCodeEl.innerHTML +=
      "<option value" + course.Code + ">" + course.Code + "</option>";
  });
}

/* =================== */
/* = Event listeners = */
/* =================== */

/* = Form navigation toggles = */
// Emphasizes the currently selected navigation-element, and reveals the related form.
createToggle.addEventListener("click", function(e) {
  e.target.classList.add("active");
  createFormEl.classList.add("active");

  updateToggleEl.classList.remove("active");
  deleteToggleEl.classList.remove("active");
  updateFormEl.classList.remove("active");
  deleteFormEl.classList.remove("active");
});

updateToggle.addEventListener("click", function(e) {
  e.target.classList.add("active");
  updateFormEl.classList.add("active");

  createToggleEl.classList.remove("active");
  deleteToggleEl.classList.remove("active");
  createFormEl.classList.remove("active");
  deleteFormEl.classList.remove("active");
});

deleteToggle.addEventListener("click", function(e) {
  // Toggle nav-elements.
  e.target.classList.add("active");
  deleteFormEl.classList.add("active");

  updateToggleEl.classList.remove("active");
  createToggleEl.classList.remove("active");
  updateFormEl.classList.remove("active");
  createFormEl.classList.remove("active");
});

/* = CRUD-related event listeners = */
/* - Delete course - */
deleteFormEl.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent the form from being submited the default way.

  fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      code: deleteCodeEl.value // Sends the value of the currently selected option in the delete form's select-element.
    })
  })
    .then(function(response) {
      response.json().then(data => {
        displayCourses(data); // Display courses on successfull fetch.
      });
    })
    .catch(function(err) {
      console.log("Fatal error: ", err);
    });
});

/* - Post course - */
createFormEl.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent the form from being submited the default way.

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      code: createCodeEl.value,
      name: createNameEl.value,
      progression: createProgressionEl.value,
      syllabus: createSyllabusEl.value
    })
  })
    .then(function(response) {
      response.json().then(data => {
        displayCourses(data); // Display courses on successfull fetch.
      });
    })
    .catch(function(err) {
      console.log("Fatal error: ", err);
    });
});

/* - Put course - */
updateFormEl.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent the form from being submited the default way.

  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      code: updateCodeEl.value,
      name: updateNameEl.value,
      progression: updateProgressionEl.value,
      syllabus: updateSyllabusEl.value
    })
  })
    .then(function(response) {
      response.json().then(data => {
        displayCourses(data); // Display courses on successfull fetch.
      });
    })
    .catch(function(err) {
      console.log("Fatal error: ", err);
    });
});

/* - Load courses when DOM is loaded. - */
document.addEventListener("DOMContentLoaded", function() {
  fetch(url)
    .then(function(response) {
      response.json().then(data => {
        displayCourses(data); // Display courses on successfull fetch.
      });
    })
    .catch(function(err) {
      console.log("Fatal error: ", err);
    });
});
