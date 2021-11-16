const mongoose = require("mongoose");

const SportEvent = new mongoose.Schema({
    eventId: { type: String, required: true, },
    titleGeo: String,
    titleEng: String,
    titleRu: String,
    groupName: { type: String, required: true, },
    smallImage: String,
    mediumImage: String,
    image: String,
    startedAt: String,
    sellStartedAt: String,
    descriptionGeo: String,
    descriptionEng: String,
    descriptionRu: String,
    locationGeo: String,
    locationEng: String,
    locationRu: String,
    adressGeo: String,
    adressEng: String,
    adressRu: String,
    price: Number,
    status: Boolean,
});
const TopEvent = new mongoose.Schema({
    eventId: { type: String, required: true, },
    titleGeo: String,
    titleEng: String,
    titleRu: String,
    groupName: { type: String, required: true, },
    smallImage: String,
    mediumImage: String,
    image: String,
});


const EventSchema = new mongoose.Schema({
    topEvents: [TopEvent],
    sportEvents: [SportEvent],
});

module.exports = mongoose.model("events", EventSchema);
