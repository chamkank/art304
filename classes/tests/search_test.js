var search = require('../search');

search.getArtByTags(['cats', 'painting']).then((res)=>{
    console.log(res);
}, (err)=>{
    console.log(err);
})
