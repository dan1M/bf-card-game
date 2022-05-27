import Card from './card';

export default class Dealer {
            /* for (let i = 0; i < 20; i++) {
                let playerCard = new Card(this);
                playerCard.render(150 + (i * 50), 650, 'edea');
            } */
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'edea';
                opponentSprite = 'ydra';
            } else {
                playerSprite = 'ydra';
                opponentSprite = 'edea';
            };
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + (i * 100), 650, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, opponentSprite));
            }
        }
    }
}