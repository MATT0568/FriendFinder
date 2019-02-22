var friends = require("../data/friends");


module.exports = function (app) {
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        console.log(newFriend);
        friends.push(newFriend);
        var friendIndex = findFriend(newFriend.name, newFriend.scores);
        console.log(friends[friendIndex].name);
        res.json(friends[friendIndex]);
    });

    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });
};

function findFriend(name, scores) {
    differences = new Array();
    for (friend in friends) {
        console.log("YOUARE ON FRIEND NUMBER:" + friend);
        var difference = 0;
        if (friends[friend].name !== name) {
            for (value in scores) {
                difference += Math.abs(parseInt(scores[value]) - parseInt(friends[friend].scores[value]));
                console.log("difference: " + difference + " my value: " + parseInt(scores[value]) + " friend value: " + parseInt(friends[friend].scores[value]));
            }
            differences.push(difference);
        }
    }
    console.log(differences);
    var lowest = 0;
    for (var i = 1; i < differences.length; i++) {
        if (differences[i] < differences[lowest]) {
            lowest = i;
        }
    }
    return lowest;
}