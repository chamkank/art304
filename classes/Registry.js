var db = requre('../database');

registry = {};

// returns all tags in database
registry.getTags = () => {
    db.query("SELECT * from Tag", (err, res) => {
        if (err){
            console.error("Error selecting all tags", err);
        }
        return res.rows;
    });
};

// returns all art in database
registry.getArt = () => {
    db.query("SELECT * from Art", (err, res) => {
        if (err){
            console.error("Error selecting all art", err);
        }
        return res.rows;
    });
};

// returns all artists in database
registry.getArtists = () => {
    db.query("SELECT * from Artist_Wall", (err, res) => {
        if (err){
            console.error("Error selecting all artists", err);
        }
        return res.rows;
    });
};

// returns all comments in database
registry.getComment = () => {
    db.query("SELECT * from Comment", (err, res) => {
        if (err){
            console.error("Error selecting all comments", err);
        }
        return res.rows;
    });
};

module.exports = registry;