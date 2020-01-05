"use strict";

// API-URL.
const url = "http://localhost/rest/index.php/";

/* = Variables = */
/* - Form navigation-variables - */
const createToggle = document.getElementById("createToggle");
const updateToggle = document.getElementById("updateToggle");
const deleteToggle = document.getElementById("deleteToggle");
const toggles = [createToggle, updateToggle, deleteToggle];

/* - Form variables - */
const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const deleteForm = document.getElementById("deleteForm");
const forms = [createForm, updateForm, deleteToggle];

/* - Form input-variables - */
/* - Create-form - */
const createCode = document.getElementById("createCode");
const createName = document.getElementById("createName");
const createProgression = document.getElementById("createProgression");
const createPlan = document.getElementById("createPlan");
/* - Update-form - */
const updateCode = document.getElementById("updateCode");
const updateName = document.getElementById("updateName");
const updateProgression = document.getElementById("updateProgression");
const updatePlan = document.getElementById("updatePlan");



function toggleElements(...[...args])
{
    for(let i = 0; i < arguments.length; i++)
    {

    }

    createToggle.classList.add("active");
    updateToggle.classList.remove("active");
    deleteToggle.classList.remove("active");
    // Toggle forms.
    createForm.classList.add("active");
    updateForm.classList.remove("active");
    deleteForm.classList.remove("active");
};




/* = Event listeners = */
/* - Form navigation toggle - */

createToggle.addEventListener("click",function()
{
    // Toggle nav-elements.
    createToggle.classList.add("active");
    updateToggle.classList.remove("active");
    deleteToggle.classList.remove("active");
    // Toggle forms.
    createForm.classList.add("active");
    updateForm.classList.remove("active");
    deleteForm.classList.remove("active");
});


createToggle.addEventListener("click",function()
{
    // Toggle nav-elements.
    createToggle.classList.add("active");
    updateToggle.classList.remove("active");
    deleteToggle.classList.remove("active");
    // Toggle forms.
    createForm.classList.add("active");
    updateForm.classList.remove("active");
    deleteForm.classList.remove("active");
});

updateToggle.addEventListener("click",function()
{
    // Toggle nav-elements.
    updateToggle.classList.add("active");
    createToggle.classList.remove("active");
    deleteToggle.classList.remove("active");
    // Toggle forms.
    updateForm.classList.add("active");
    createForm.classList.remove("active");
    deleteForm.classList.remove("active");
});

deleteToggle.addEventListener("click",function()
{
    // Toggle nav-elements.
    deleteToggle.classList.add("active");
    updateToggle.classList.remove("active");
    createToggle.classList.remove("active");
    // Toggle forms.
    deleteForm.classList.add("active");
    updateForm.classList.remove("active");
    createForm.classList.remove("active");
});


document.getElementById("createForm").addEventListener("submit", function(e)
{
    e.preventDefault();
    const formData = new FormData();
    formData.append();
    
    fetch(url, {
        method: 'post',
        body: 'formData'
    }).then(
        function (response){
            if(response.status !== 200)
            {
                console.log(response.status);
                return;
            }
            response.json().then(function(data){
                displayCourses(data);
            });
        }
    ).catch(function(err){
        console.log("Fatal error: ", err);
    });
});