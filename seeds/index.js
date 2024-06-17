const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author:'6651cfb4c7210918b3df8d64',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo cumque necessitatibus delectus neque saepe quas, optio unde doloremque quam ipsa distinctio voluptatem itaque quod earum numquam minima quaerat minus.',
            price:price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,          
                ]  },
            images:[
                {
                  url: 'https://res.cloudinary.com/dlzmjuj94/image/upload/v1718116784/YelpCamp/ktlngtwgv5hgzzvm71fl.png',
      filename: 'YelpCamp/ktlngtwgv5hgzzvm71fl',
                },
                {
                  url: 'https://res.cloudinary.com/dlzmjuj94/image/upload/v1717908172/YelpCamp/nakcitjcek95sgoultv6.png',
                  filename: 'YelpCamp/nakcitjcek95sgoultv6',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})