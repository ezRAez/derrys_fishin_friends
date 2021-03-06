var mongoose = require('./database');

var Fish = require('../models/fish'),
    User = require('../models/user');

var newUsers = [
  { // 0
    name: "Earl Url",
    phoneNumber: "4442831923",
    password: "fr1ensh1pw1ns"
  },
  { // 1
    name: "Mary Funnelcake",
    phoneNumber: "3235558743",
    password: "tuberculos1s"
  },
  { // 2
    name: "Ayn Rand Paul Walker",
    phoneNumber: "1001011101",
    password: "objecteav8ism"
  },
  { // 3
    name: "Dude",
    phoneNumber: "5554445555",
    password: "abc123"
  }
];

// remove any fish or users in the database
Fish.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);

    // create users
    User.create(newUsers, function(err, users) {

      var fishes = [
        { // 0
          name: "Michelin Tire",
          category:  "Trash",
          user: users[0]._id
        },
        { // 1
          name: "Tabby (Derry's Dog)",
          category:  "Corpse",
          user: users[1]._id
        },
        { // 2
          name: "Trout",
          category: "Fish",
          user: users[0]._id
        },
        { // 3
          name: "Flounder",
          category: "Fish",
          user: users[3]._id
        },
        { // 4
          name: "Left Boot",
          category: "Clothing",
          user: users[2]._id
        }
      ];

      // create default fishes
      Fish.create(fishes, function(err, fishes) {
        users[0].fishes(function(err, fishes) {
          console.log(err);
          console.log(fishes);
        });
        if (err) {
          console.log(err);
        } else{
          console.log(`Database seeded with ${users.length} users and ${fishes.length} fishes`);

          // disconnect db
          mongoose.connection.close();
        }
        process.exit();
      });
    });
  });
});
