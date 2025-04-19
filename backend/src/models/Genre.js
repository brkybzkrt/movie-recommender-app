import mongoose from 'mongoose';


const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const Genre = mongoose.model('Genre', genreSchema);

export default Genre;