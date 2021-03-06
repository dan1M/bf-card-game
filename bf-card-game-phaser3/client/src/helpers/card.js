export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setScale(0.1).setInteractive({cursor: 'pointer'})
            .on('pointerover', () => {
                card.setScale(0.2);
            }).on('pointerout', () => {
                card.setScale(0.1);
            });
            scene.input.setDraggable(card);
            return card;
        }
    }
}