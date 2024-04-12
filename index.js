const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                   
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Trigger search when Enter key is pressed
        document.getElementById("search-btn").click();
    }
});
document.addEventListener("click", function(event) {

    if (event.target !== document.getElementById("inp-word") && event.target !== document.getElementById("result")) {
        
        document.getElementById("inp-word").value = "";
        
        document.getElementById("result").innerHTML = "";
    }
});



// Add event listener to handle delete action
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        // Get the parent element of the delete button (which is the word div)
        const wordDiv = event.target.closest(".word");
        // Remove the word div from the result container
        wordDiv.remove();
    }
});

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    if (inpWord.trim() === "") {
        alert("Please enter a word before searching.");
    } else {
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>/${data[0].phonetic}/</p>
                    </div>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </p>`;
                
            })
            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            });
    }
});
