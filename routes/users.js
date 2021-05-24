const express = require("express");
const router = express.Router();

const users = [
  {
    id: 1,
    name: "aleks",
    subreddits: ["funny"],
    newsletter_sendout: "08:00",
    newsletter_active: true,
  },
  {
    id: 2,
    name: "nuno",
    subreddits: ["technology", "funny"],
    newsletter_sendout: "08:00",
    newsletter_active: true,
  },
];

// get all users
router.get("/", (req, res) => {
  // res.send(users)
  res.status(200).json({
    status: "sucess",
    data: users,
  });
});
// get single user
router.get("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the givin id was not found.");

  //    res.send(user)
  res.status(200).json({
    status: "sucess",
    data: user,
  });
});
// create user
router.post("/", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    subreddits: [],
    newsletter_sendout: "08:00",
    newsletter_active: true,
  };
  users.push(user);

  // res.send(user)
  res.status(200).json({
    status: "sucess",
    data: user,
  });
});
// update user
router.patch("/:id", (req, res) => {
  // get and validate user
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the givin id was not found.");

  if (req.body.name) user.name = req.body.name;
  if (req.body.subreddits) user.subreddits.push(req.body.subreddits);
  if (req.body.newsletter_sendout)
    user.newsletter_sendout = req.body.newsletter_sendout;
  if (req.body.newsletter_active)
    user.newsletter_active = req.body.newsletter_active;

  res.send(user);
});

module.exports = router;
module.exports.users = users;
