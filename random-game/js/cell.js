export class Cell {
  constructor(gridElement, x, y) {
    const item = document.createElement("div");
    item.classList.add("item");
    gridElement.append(item);
    this.x = x;
    this.y = y;
  }
  linkTile(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTile = tile;
  }
  isEmpty() {
    return !this.linkedTile;
  }

  unlinkTile() {
    this.linkedTile = null;
  }
  linkTileForMerge(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTileForMerge = tile;
  }
  canAccept(newTile) {
    return (
      this.isEmpty() ||
      (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
    );
  }

  unlinkTileForMerge() {
    this.linkedTileForMerge = null;
  }

  hasTileForMerge() {
    return !!this.linkedTileForMerge;
  }

  mergeTiles() {
    this.linkedTile.setValue(
      this.linkedTile.value + this.linkedTileForMerge.value
    );
    this.linkedTileForMerge.removeFromDOM();
    this.unlinkTileForMerge();
  }
}
