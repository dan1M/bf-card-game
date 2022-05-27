import Card from './card';

export default class Dealer {
        
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
            for (let i = 0; i < 20; i++) {
                let playerCard = new Card(scene);
                playerCard.render(80 + (i * 80), innerHeight*0.8, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(80 + (i * 80), innerHeight*0.2, opponentSprite));
            }
        }
    }
}