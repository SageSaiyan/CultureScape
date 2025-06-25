const mongoose=require('mongoose');
const cities=require('./cities');
const CulturalSite=require('../models/culturalSite')
const {places, description, descriptors}=require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/culture-scape')
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

const db=mongoose.connection;

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await CulturalSite.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const site=new CulturalSite({
            author: '681defa599eaf114b99446a0',
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(descriptors)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas quod animi dolorum eum consectetur odit ipsum praesentium fugiat cumque, quo culpa minus aperiam ipsa laboriosam saepe voluptate reiciendis, beatae mollitia.',
            price,
            geometry:{
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dcufzfej7/image/upload/v1747746328/CultureScape/u1aryxga7fdc3ymdda7o.png',
                  filename: 'CultureScape/u1aryxga7fdc3ymdda7o'
                },
                {
                  url: 'https://res.cloudinary.com/dcufzfej7/image/upload/v1747746346/CultureScape/zblxaj6pnmewa2vpbogj.png',
                  filename: 'CultureScape/zblxaj6pnmewa2vpbogj'
                }
              ]
        })
        await site.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.closek
});