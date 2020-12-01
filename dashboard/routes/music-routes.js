const express = require('express');
const { sendError } = require('../modules/api-utils');

const router = express.Router({ mergeParams: true });

router.get('/play', async (req, res) => {
  try {
    const track = await res.locals.player
      .play(req.query.q, res.locals.requestor);

    res.json(track);
  } catch (error) {
    sendError(res, { message: error?.message });
  }
});

router.get('/stop', async (req, res) => {
  try {
    await res.locals.player.stop();

    res.json({ code: 200, message: 'Success!' });
  } catch (error) {
    sendError(res, { message: error?.message });
  }
});

module.exports = router;
