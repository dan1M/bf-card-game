import Card from './card';

export default class Dealer {
        
    constructor(scene) {
        let deck = [];

        for (let el in scene.textures.list){
            if(!(el == '__DEFAULT' || el == '__MISSING' || el == '__WHITE')){
                deck.push(el);
            }
        }

        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'vargas';
                opponentSprite = 'ydra';
            } else {
                playerSprite = 'ydra';
                opponentSprite = 'vargas';
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