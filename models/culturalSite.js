const mongoose=require('mongoose');
const Review=require('./review');
const Schema=mongoose.Schema;

const ImageSchema=new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
});

const opts={toJSON: {virtuals:true}};

const CulturalSiteSchema=new Schema({
    title: String,
    images:[ImageSchema],
    geometry:{
        type:{
            type: String,
            enum: ['Point'],
            required: true
            },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
}, opts);

CulturalSiteSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a href="/culturalsites/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,30)}</p>`
});

CulturalSiteSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports=mongoose.model('CulturalSite',CulturalSiteSchema)