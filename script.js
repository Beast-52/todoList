const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Keep your face always toward the sunshine - and shadows will fall behind you. - Walt Whitman"
];

document.addEventListener("DOMContentLoaded", function() {
    const searchbar = document.querySelector(".searchbar");
    const listContainer = document.querySelector(".list_container");
    const addButton = document.querySelector(".add");
    const themeButtons = document.querySelectorAll(".theme");
    const body = document.body;

    // Load saved notes and theme when the page is loaded
    loadNotes();
    loadTheme();

    // Function to save notes to local storage
    function saveNotes() {
        const notes = [];
        listContainer.querySelectorAll("li").forEach(li => {
            notes.push({ content: li.querySelector('.text').textContent, checked: li.classList.contains("checked") });
        });
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Function to load saved notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (notes) {
            notes.forEach(note => {
                addListItem(note.content, note.checked);
            });
        }
    }

    // Function to add a new list item
    function addListItem(content, checked = false) {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = content;
        text.classList.add('text');
        li.appendChild(text);
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = content;
        editInput.classList.add('editInput');
        editInput.style.display = "none";
        li.appendChild(editInput);
        if (checked) {
            li.classList.add("checked");
        }
        listContainer.appendChild(li);
        addButtons(li);
    }

    // Function to add delete and edit buttons to a list item
    function addButtons(item) {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const deleteButton = document.createElement("span");
        deleteButton.innerHTML = "&times;";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            item.remove();
            saveNotes();
        });

        const editButton = document.createElement("span");
        editButton.innerHTML = "&#9998;";
        editButton.className = "edit";
        editButton.addEventListener("click", function() {
            const text = item.querySelector('.text');
            const editInput = item.querySelector('.editInput');
            const saveButton = item.querySelector('.save');
            text.style.display = "none";
            editInput.style.display = "inline-block";
            saveButton.style.display = "inline-block";
            editInput.focus();
        });

        const saveButton = document.createElement("span");
        saveButton.innerHTML = "&#10004;";
        saveButton.className = "save";
        saveButton.style.display = "none";
        saveButton.addEventListener("click", function() {
            const text = item.querySelector('.text');
            const editInput = item.querySelector('.editInput');
            text.textContent = editInput.value;
            text.style.display = "inline-block";
            editInput.style.display = "none";
            saveButton.style.display = "none";
            saveNotes();
        });

        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(editButton);
        item.appendChild(buttonsDiv);
        item.appendChild(saveButton);
    }

    // Event listener to handle adding new tasks
    addButton.addEventListener("click", function() {
        const task = searchbar.value.trim();
        if (task !== "") {
            addListItem(task);
            searchbar.value = "";
            saveNotes(); // Save notes after adding a new item
        }
    });
    // Function to display a random quote
    function displayRandomQuote() {
        const quoteElement = document.querySelector(".quote");
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }

    // Call the function to display a random quote when the page loads
    displayRandomQuote();

    // Event listener to toggle task completion with animation
    listContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "LI" || target.classList.contains("edit") || target.classList.contains("delete") || target.classList.contains("save")) {
            event.stopPropagation();
        }
        if (target.tagName === "LI") {
            target.classList.toggle("checked");
            saveNotes(); // Save notes when a list item is toggled
        }
    });

    // Event listener to handle theme selection
    themeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const selectedTheme = this.getAttribute("data-theme");
            setTheme(selectedTheme);
        });
    });

    // Function to set the theme
    function setTheme(theme) {
        body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    // Function to load the theme
    function loadTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }
});