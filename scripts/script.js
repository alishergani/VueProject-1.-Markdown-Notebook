const vue = new Vue({
  el: '#notebook',
  data() {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id')
    }
  },
  methods: {
    saveNotes () { // Saving TOTAL notes array even one of them is changed
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    addNote() {
      let x = this.notes.length + 1;
      const note = {
        id: String(Date.now()),
        title: 'Note ' + (this.notes.length + 1),
        content: `Content of **${x}${ (x==1) ? '\'st' : (x==2 ? '\'nd' : (x==3 ? '\'rd' : '\'th'))}** note`,
        created: Date.now(),
        favorite: false
      }
      this.notes.push(note) // push below note to notes list array 
      this.selectNote(note)
    },
    selectNote(note) {
      return this.selectedId = note.id
    },
    removeNote() {
      let index = this.notes.indexOf(this.selectedNote)
      if (this.selectedNote && confirm('Delete this note?') && (index !== -1)) {
        this.notes.splice(index, 1)
        if (this.notes.length > 0) {
          this.selectedId = this.notes[0].id
        }
      }
    },
    favoriteNote() {
      // this.selectedNote.favorite = !this.selectedNote.favorite
      this.selectedNote.favorite ^= true
    }
  },
  computed:  {
    notePreview() {
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    addButtonTitle() {
      let x = this.notes.length + 1;
      return `Add ${x} ${ (x==1) ? '\'st' : (x==2 ? '\'nd' : (x==3 ? '\'rd' : '\'th'))} note`
    },
    selectedNote() {
      return this.notes.find((note) => note.id === this.selectedId)
    },
    sortedNotes() {
      return this.notes.slice()
        .sort( (a, b) => a.created - b.created )
        .sort( (a, b) => (a.favorite === b.favorite) ? 0 : (a.favorite ? -1 : 1))
    }
  },
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true 
    },
    selectedId (val) {
      localStorage.setItem('selected-id', val)
    },
  }
})