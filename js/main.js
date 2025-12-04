const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const uploadMessage = document.getElementById("upload-message");
const imagePreviewContainer = document.getElementById("image-preview-container");
const previewImage = document.getElementById("preview-image");
const removeBtn = document.getElementById("remove-btn");
const changeBtn = document.getElementById("change-btn");

const generateBtn = document.getElementById("generate-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");

const wrapper = document.getElementById("wrapper");
const successWrapper = document.getElementById("success-wrapper");

const emailErrorDiv = document.getElementById("email-error");

const infoRowDiv = document.getElementById("info-row")
const infoRowParagraph = document.getElementById("info-p-error")


const generatedEmailSpan = document.getElementById("generated-email");
const generatedGithubSpan = document.getElementById("ticket-github");


const generatedTicketNum = document.getElementById("generated-ticket-num");



// Generate ticket number
const ticketNum = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `#${randomNum}`;
}


generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    nameInput.value = nameInput.value.trim();
    emailInput.value = emailInput.value.trim();
    githubInput.value = githubInput.value.trim();

    if (!nameInput.value) {
        alert("Please enter your full name.");
        return;
    }

    if (!emailInput.value) {
        emailErrorDiv.classList.remove("hidden");
        emailInput.classList.add("input-error");
        return;
    }

    if (!githubInput.value) {
        alert("Please enter your GitHub username.");
        return;
    }

    if (!previewImage.src) {
        alert("Please upload your photo.");
        return;
    }

    // If all validations pass, submit the form (for demo, just alert)

    wrapper.classList.add("hidden");
    successWrapper.classList.remove("hidden");
    generatedEmailSpan.textContent = emailInput.value;
    generatedGithubSpan.textContent = githubInput.value;
    const nameElements = document.querySelectorAll("#generated-name")
    nameElements.forEach(el => {
        el.textContent = nameInput.value
    })
    generatedTicketNum.textContent = ticketNum();

    document.querySelector(".ticket-avatar").src =
        localStorage.getItem("uploadedAvatar") || "assets/images/image-avatar.jpg";
})


// Prevent default drag behaviors
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults);
});

// Highlight drop area
dropArea.addEventListener("dragenter", () => dropArea.classList.add("highlight"));
dropArea.addEventListener("dragover", () => dropArea.classList.add("highlight"));
dropArea.addEventListener("dragleave", () => dropArea.classList.remove("highlight"));
dropArea.addEventListener("drop", () => dropArea.classList.remove("highlight"));

// Handle file selection
function handleFiles(files) {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
    }

    const sizeInBytes = file.size
    const sizeInKb = (sizeInBytes / 1024).toFixed(2)

    if (sizeInKb > 500) {
        infoRowParagraph.classList.remove("hidden")
        infoRowParagraph.classList.add("error")
        document.getElementById("info-p-correct").classList.add("hidden")
        document.querySelector(".icon-info").classList.add("error")
        return

    }

    // File is valid, hide error and show success message
    infoRowParagraph.classList.add("hidden")
    infoRowParagraph.classList.remove("error")
    document.getElementById("info-p-correct").classList.remove("hidden")
    document.querySelector(".icon-info").classList.remove("error")

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        previewImage.src = reader.result;
        localStorage.setItem("uploadedAvatar", reader.result);
        infoRowDiv.classList.add("hidden")
        uploadMessage.style.display = "none";
        imagePreviewContainer.style.display = "flex";
    };
}

// Drag & drop
dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Click to upload
dropArea.addEventListener("click", () => fileInput.click());

// File input change
fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
});

// Remove image
removeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering dropArea click
    previewImage.src = "";
    fileInput.value = "";
    imagePreviewContainer.style.display = "none";
    uploadMessage.style.display = "flex";
    infoRowDiv.classList.remove("hidden");
    localStorage.removeItem("uploadedAvatar");
});

// Change image
changeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering dropArea click
    fileInput.click();
});




// Form validation and submission