var _a;
// Listen for the form submit event
(_a = document.getElementById("resumeform")) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Type assertion for form elements
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    // Check if all the elements exist
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        // Store the values in localStorage
        localStorage.setItem('name', name_1);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('education', education);
        localStorage.setItem('experience', experience);
        localStorage.setItem('skills', skills);
        // Update the resume output immediately
        updateResumeOutput();
    }
});
// Function to update the resume output based on localStorage values
function updateResumeOutput() {
    var name = localStorage.getItem('name') || '';
    var email = localStorage.getItem('email') || '';
    var phone = localStorage.getItem('phone') || '';
    var education = localStorage.getItem('education') || '';
    var experience = localStorage.getItem('experience') || '';
    var skills = localStorage.getItem('skills') || '';
    var resumeOutput = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p><span id=\"edit-education\" class=\"editable\">").concat(education, "</span></p>\n\n        <h3>Experience</h3>\n        <p><span id=\"edit-experience\" class=\"editable\">").concat(experience, "</span></p>\n\n        <h3>Skills</h3>\n        <p><span id=\"edit-skills\" class=\"editable\">").concat(skills, "</span></p>\n    ");
    // Get the resume output element
    var resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        // Display the resume
        resumeOutputElement.innerHTML = resumeOutput;
        // Make fields editable
        makeEditable();
    }
}
// Function to make fields editable and save changes to localStorage
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var inputElement_1 = document.createElement("input");
                inputElement_1.type = "text";
                inputElement_1.classList.add('editing-input');
                inputElement_1.value = currentValue;
                inputElement_1.addEventListener('blur', function () {
                    currentElement.textContent = inputElement_1.value;
                    currentElement.style.display = 'inline';
                    inputElement_1.remove();
                    // Update localStorage with the new value
                    var key = currentElement.id.replace('edit-', ''); // Extract the key from the id
                    localStorage.setItem(key, inputElement_1.value); // Save the updated value in localStorage
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(inputElement_1, currentElement);
                inputElement_1.focus();
            }
        });
    });
}
// Load the resume output when the page loads
window.addEventListener('load', function () {
    updateResumeOutput(); // Load the stored data when the page is refreshed
});
