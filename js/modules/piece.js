export class Piece {
  //pole chronione (zamierzamy wykorzystać w klasach dziedziczących czyli dzieciach)
  _player;

  constructor(playerIndex) {
    this.player = playerIndex;
  }

  get name() {
    return this.constructor.name.toLowerCase();
  }

  //wsteczna kompatybilnosc
  set player(value) {
    this._player = value;
  }

  get player() {
    return this._player;
  }

  set playerIndex(value) {
    this._player = value;
  }

  get playerIndex() {
    return this._player;
  }
}
