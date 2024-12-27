const mongoose = require('mongoose');
const initdata = require("./data.js");
const listing = require("../models/listing.js");

main().then(()=>{
    console.log("connectin is sucessful")
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}

const initDB = async ()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
        ...obj ,  owner:"6763c22572a6754c46794a06"
    }));
    await listing.insertMany(initdata.data);
    console.log("data was initilized");
}

initDB();

