const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    debugger
    for(let i = 0; i < notes.length; i++){
        if(notes[i].title == title){
            console.log(chalk.red('Entered title is already in use.'))
            return
        }
    }
    const currNote = {
        title: title,
        body: body
    }
    notes.push(currNote)
    const noteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteJSON)
    console.log(chalk.green('Note added!'))
}

const removeNote = (title) => {
    let notes = loadNotes(), found = false
    for(let i = 0; i < notes.length; i++){
        if(notes[i].title == title){
            found = true
            notes.splice(i)
            break
        }
    }

    if(!found){
        console.log(chalk.red('Note with entered title doesn\'t exist.'))
    }
    else{
        const noteJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', noteJSON)
        console.log(chalk.green('Note removed!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    for(let i = 0; i < notes.length; i++){
        if(notes[i].title == title){
            console.log('Title: ' + notes[i].title)
            console.log('Body: ' + notes[i].body)
            return
        }
    }
    console.log(chalk.red('Note with entered title doesn\'t exist.'))
}

const listNotes = () => {
    const notes  = loadNotes()
    if(notes.length == 0){
        console.log(chalk.red('No notes exist.'))
    }
    else{
        for(let i = 0; i < notes.length; i++){            
            console.log('Title: ' + notes[i].title)
            console.log('Body: ' + notes[i].body + '\n')
        }
    }
}

const about = () => {
    console.log(chalk.yellow(`Created by Darshan Tailor.`))
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes,
    about: about
}