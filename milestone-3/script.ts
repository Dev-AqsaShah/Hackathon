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
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        // Get the resume output element
        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            // Display the resume
            resumeOutputElement.innerHTML = resumeOutput;
            // Hide the form after submission
            (document.getElementById("resumeform") as HTMLElement).style.display = "none";
        } else {
            console.error("Resume output element is missing");
        }
    }
});
