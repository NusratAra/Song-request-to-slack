var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection('songs').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/songs', (req, res) => {
    const songs = {
      id: req.body.id,
      youtube_link: req.body.youtube_link,
      played: req.body.played,
      created_at: req.body.created_at
    };
    db.collection('songs').insert(songs, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/songs/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const song = { id: req.body.id, youtube_link: req.body.youtube_link, played: req.body.played };
    db.collection('songs').update(details, song, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(song);
      }
    });
  });
};
