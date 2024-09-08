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

        // Create the resume output
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

            // Enable edit functionality
            makeEditable();
        }
    } else {
        console.error("One or more form elements are missing");
    }
});

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
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(inputElement, currentElement);
                inputElement.focus();
            }
        });
    });
}
