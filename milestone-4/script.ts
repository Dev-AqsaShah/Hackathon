// Listen for the form submit event
document.getElementById("resumeform")?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Type assertion for form elements
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const experienceElement = document.getElementById("experience") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;

    // Check if all the elements exist
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        // Store the values in localStorage
        localStorage.setItem('name', name);
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
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';
    const phone = localStorage.getItem('phone') || '';
    const education = localStorage.getItem('education') || '';
    const experience = localStorage.getItem('experience') || '';
    const skills = localStorage.getItem('skills') || '';

    const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

        <h3>Education</h3>
        <p><span id="edit-education" class="editable">${education}</span></p>

        <h3>Experience</h3>
        <p><span id="edit-experience" class="editable">${experience}</span></p>

        <h3>Skills</h3>
        <p><span id="edit-skills" class="editable">${skills}</span></p>
    `;

    // Get the resume output element
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        // Display the resume
        resumeOutputElement.innerHTML = resumeOutput;

        // Make fields editable
        makeEditable();
    }
}

// Function to make fields editable and save changes to localStorage
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener("click", function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.classList.add('editing-input');
                inputElement.value = currentValue;

                inputElement.addEventListener('blur', function () {
                    currentElement.textContent = inputElement.value;
                    currentElement.style.display = 'inline';
                    inputElement.remove();

                    // Update localStorage with the new value
                    const key = currentElement.id.replace('edit-', ''); // Extract the key from the id
                    localStorage.setItem(key, inputElement.value); // Save the updated value in localStorage
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(inputElement, currentElement);
                inputElement.focus();
            }
        });
    });
}

// Load the resume output when the page loads
window.addEventListener('load', function () {
    updateResumeOutput(); // Load the stored data when the page is refreshed
});
