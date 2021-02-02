const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note)
    {
        console.log(chalk.green.inverse('Your note:'))
        console.log(chalk.green('- Title: ' + note.title))
        console.log(chalk.green('- Body: ' + note.body))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title) 

    if (!duplicate) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.bold.green('Note added!'))
   }
   else {
       console.log(chalk.bold.red('Note already exists with the same title!'))
   }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const minus = notes.filter((note) => note.title !== title) 

    if (minus.length != notes.length)
    {
        saveNotes(minus);
        console.log(chalk.green.inverse('Note removed'))
    }
    else
    {
        console.log(chalk.red.inverse('No note found'))   
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.green('Your notes:'))
    if (notes.length > 0) {
        notes.forEach((note) => {
            console.log(chalk.green('- ' + note.title))
        })
    } else {
        console.log(chalk.red('- No notes found'))
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}