const express = require("express");
const router = express.Router();
const { users } = require('../db/users')


 /** Get all users */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "sucess",
    data: users,
  });
});

 /** Get single user */
router.get("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the givin id was not found.");

  res.status(200).json({
    status: "sucess",
    data: user,
  });
});

 /** Create single user */
router.post("/", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    subreddits: [],
    newsletter_sendout: "08:00",
    newsletter_active: true,
  };

  users.push(user);

  res.status(200).json({
    status: "sucess",
    data: user,
  });
});

 /** Update single user */
router.patch("/:id", (req, res) => {
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
