const { MusicClient } = require('@2pg/music');

module.exports = new class MusicHandler {
  #client = new MusicClient();

  // there is no text channel
  get(options) {
    return this.#client.get(options.guildId)
      ?? this.#client.create(options.guildId, options);
  }
}
