// To read notes from localStorage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// To save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// To delete a note
const removeNote = (id) => {
    const noteIndex = notes.findIndex( (note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// To generate the DOM structure for a note
const generateNoteDOM =  (note) => 
{
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function () 
    {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Setup the note title text
    if (note.title.length > 0) 
    {
        textEl.textContent = note.title
    } else 
    {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

// Sorting the notes
const sortNotes = function (notes, sortBy) 
{
    if (sortBy === 'byEdited') 
    {
        return notes.sort(function (a, b) 
        {
            if (a.updatedAt > b.updatedAt) 
            {
                return -1
            } 
            else if (a.updatedAt < b.updatedAt) 
            {
                return 1
            } 
            else 
            {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') 
    {
        return notes.sort(function (a, b) 
        {
            if (a.createdAt > b.createdAt) 
            {
                return -1
            }
            else if (a.createdAt < b.createdAt) 
            {
                return 1
            } 
            else 
            {
                return 0
            }
        })
    } 
    else if (sortBy === 'alphabetical') 
    {
        return notes.sort(function (a, b) 
        {
            if (a.title.toLowerCase() < b.title.toLowerCase()) 
            {
                return -1
            } 
            else if (a.title.toLowerCase() > b.title.toLowerCase()) 
            {
                return 1
            } 
            else 
            {
                return 0
            }
        })
    } 
    else 
    {
        return notes
    }
}

// To render application notes
const renderNotes = function (notes, filters) 
{
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(function (note) 
    {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) 
    {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

// To generate the last edited message
const generateLastEdited = function (timestamp) 
{
    return `Last edited ${moment(timestamp).fromNow()}`
}