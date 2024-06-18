let notesListRootElement=document.querySelector('.notesList');
let notes=[];

function renderElementsToScreen(){
    if(localStorage.getItem('notes')){
        
        notes=JSON.parse(localStorage.getItem('notes'));
        console.log(notes);
        notes.forEach(note=>renderNoteToList(note,note.uniqueID));
    }
}

// Delete All note functionality
document.querySelector('#deleteAllNotes').addEventListener('click',()=>{
    document.querySelectorAll('.note').forEach(note=>note.remove());
    localStorage.clear();
})
// Add "Create new note" functionality
document.querySelector('#createNoteButton').addEventListener('click', () => {
    // Get the title and content from input fields
    let titleInput = document.querySelector('#createNoteTitle');
    let contentInput = document.querySelector('#createNoteContent');
    let uniqueID='note'+Math.floor(Math.random() * 1000);

    // Validate the input
    if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
        alert('Please enter both title and content to create a note.');
    } else {
        let note = {
            title: titleInput.value,
            content: contentInput.value
        };
        addNoteToLocalStorage(note,uniqueID);
        renderNoteToList(note,uniqueID);
    }
    
});

// Function to render the note
function renderNoteToList(note,uniqueID) {
    
    // Create a new note div and add its components
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note', uniqueID);
    let noteTitle = document.createElement('h4');
    let noteContent = document.createElement('p');
    let noteDelete = document.createElement('button');
    
    // Set the inner text of the note
    noteTitle.innerText = note.title;
    noteContent.innerText = note.content;
    noteDelete.innerText = 'Delete Note';
    
    // Append to the note div
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(noteContent);
    noteDiv.appendChild(noteDelete);

    // Delete note functionality
    noteDelete.addEventListener('click', () => {
        removeElementFromNoteList(uniqueID)
    });

    // Append to the notes list
    notesListRootElement.appendChild(noteDiv);
    document.querySelector('#createNoteTitle').value='';
    document.querySelector('#createNoteContent').value='';
    
}
function addNoteToLocalStorage(note,uniqueID){
    note={...note, uniqueID};
    notes.push(note);
    localStorage.setItem('notes',JSON.stringify(notes));
}

// removeElementFromNoteList functionality
function removeElementFromNoteList(id){
    document.querySelector('.'+id).remove();
    notes=JSON.parse(localStorage.getItem('notes'));
    let index=notes.findIndex(note=>note.uniqueID == id)
    notes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
}
renderElementsToScreen();