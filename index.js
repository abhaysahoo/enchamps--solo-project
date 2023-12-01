import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-tracker-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const textareaEl = document.getElementById("textarea-field")
const publishBtnEl = document.getElementById("publish-btn")
const displayContainerEl = document.getElementById("display-container")

publishBtnEl.addEventListener("click", function() {
    const text = textareaEl.value;
    addToList(text)
    clearTextareaEl()  
})

function addToList(text) {
    push(endorsementsInDB, text)
}

function clearTextareaEl() {
    textareaEl.value = "" 
}

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) { 
        let itemsArray = Object.entries(snapshot.val())
        
        clearDisplayEl()
        
        for( let i = 0; i < itemsArray.length; i++ ) {
            const currentItem = itemsArray[i]
            displayItem(currentItem)
        }
    } else {
        displayContainerEl.innerHTML = "No endorsements yet..."
    }
})

function clearDisplayEl() {
    displayContainerEl.innerHTML = ""
}

function displayItem(item) { 
    const itemID = item[0]
    const itemText = item[1]
    let endorsementTextEl = document.createElement("div")
    endorsementTextEl.className = "endorsement-items"
    endorsementTextEl.textContent = itemText
    displayContainerEl.append(endorsementTextEl)   
}
