const express = require('express');
const { validateGuild } = require('../modules/middleware');
const log = require('../modules/audit-logger');
const guilds = require('../../data/guilds');
const logs = require('../../data/logs');
const bot = require('../../bot');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild,
  async (req, res) => res.render('dashboard/show', {
    savedGuild: await guilds.get(req.params.id),
    savedLog: await logs.get(req.params.id),
    users: bot.users.cache,
    q: [
      {
        title: 'Congratulations',
        thumbnail: 'https://i1.sndcdn.com/artworks-O45qNbD6w1IH-0-t200x200.jpg',
        author: 'Post Malone',
        duration: '03:00'
      },
      {
        title: 'Host Your Own Discord Bot Maker for FREE [24/7]',
        thumbnail: 'https://yt3.ggpht.com/ytc/AAUvwniw3QYtqINIuqJGN8MgzpVNs6svA7aWxCfBxDfTYQ=s88-c-k-c0x00ffffff-no-rj',
        author: 'ADAMJR',
        duration: '05:46'
      }
    ]
  }));

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
  try {
    const { id, module } = req.params;
    const savedGuild = await guilds.get(id);

    await log.change(id, {
      at: new Date(),
      by: res.locals.user.id,
      module,
      new: {...savedGuild[module]},
      old: {...req.body}
    });
    
    savedGuild[module] = req.body;
    await savedGuild.save();

    res.redirect(`/servers/${id}`);
  } catch {
    res.render('errors/400');
  }
});

module.exports = router;