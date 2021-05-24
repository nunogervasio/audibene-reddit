const express = require("express");
const router = express.Router();
const { createPayloadForNewsletter } = require("../api/createPayload");
const { users } = require("./users");

router.post("/:id", async (req, res) => {
  try {
    const user = users.find((c) => c.id === parseInt(req.params.id));
    if (!user)
      return res.status(404).send("The user with the givin id was not found.");

    const payloadForMailService = await createPayloadForNewsletter(
      parseInt(req.params.id),
      users
    );
    res.send(payloadForMailService);
  } catch (err) {
    console.log(err.message);
  }
  // res.status(200).json({
  //     status: 'sucess',
  //     data: payloadForMailService
  //     })
});

module.exports = router;
