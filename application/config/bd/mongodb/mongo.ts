import mongoose from 'mongoose';

export const mongooseConnect = () => {
// add your own uri below
  const DB_URL = 'mongodb://localhost:27017/recify';

  mongoose.connect(DB_URL, 
    {}).then ( ()=>{
      autoIndex: true
    console.log("conectado a DDBB: " + DB_URL )
    })
    .catch (()=>{
    console.log("Error conecting to DB");
    })
}


