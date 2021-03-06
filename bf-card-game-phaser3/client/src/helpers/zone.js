export default class Zone {
    constructor(scene) {
        this.renderZone = (x, y, zoneWidth, zoneHeight) => {
            let dropZone = scene.add.zone(x, y, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
            dropZone.setData({ cards: 0 });
            return dropZone;
        };
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(2, 0xff69b4);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        }
    }
}