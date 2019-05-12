var mongoose= require("mongoose") ;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

module.exports= mongoose.model("TeamBuildingDao",{
    team_building_name: String,
    heroesPicked :Array,
    aura : Object ,
    description : String,
    created_by : String,
    created: {type: Date, default: Date.now},
    slug: { type: String, slug: "team_building_name", slug_padding_size: 2,  unique: true }
},"team_building")