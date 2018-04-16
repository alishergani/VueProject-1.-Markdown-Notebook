const vue = new Vue({
  el: '#notebook',
  data() {
    return {
      content: localStorage.getItem('content'),
      notes: []
    }
  },
  computed:  {
    notePreview() {
      return marked(this.content)
    },
    addButtonTitle() {
      let x = this.notes.length + 1;
      return `Add ${x} ${ (x==1) ? '\'st' : (x==2 ? '\'nd' : (x==3 ? '\'rd' : '\'th'))} note`
    }
  },
  watch: {
    content: {
      handler: 'saveNote'
    } 
  },
  methods: {
    saveNote (val) {
      // console.log(val)
      localStorage.setItem('content', val)
    },
    addNote() {
      const note = {
        id: String(new Date()),
        title: 'Note\'s title ' + (this.notes.length + 1),
        content: 'Note\s content',
        created: new Date(),
        favorite: 0
      }

      this.notes.push(note) // push below note to notes list array 
    }
  },
  created() {
    // console.log(this.notes.length)
  }
})