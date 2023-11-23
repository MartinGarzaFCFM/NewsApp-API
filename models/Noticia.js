const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noticiaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    approved: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}

)

noticiaSchema.plugin(AutoIncrement, {
    inc_field: 'noticia',
    id: 'noticiaNums',
    start_seq: 500
})

module.exports = mongoose.model('Noticia', noticiaSchema)