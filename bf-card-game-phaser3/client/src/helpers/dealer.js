import Card from './card';

export default class Dealer {
        
    constructor(scene) {
        this.deck = []; // toutes les cartes dispo
        this.playerDeck = []; // les 20 cartes du joueur 1
        this.opponentDeck = []; // les 20 cartes du joueur 2
        this.playerHand = []; // les (6) cartes de la main joueur 1
        this.opponentHand = []; // les (6) cartes de la main joueur 2

        for (let el in scene.textures.list){
            if(!(el == '__DEFAULT' || el == '__MISSING' || el == '__WHITE')){
                this.deck.push(el);
            }
        }


        
        this.dealCards = (socketId) => {
            if (socketId === scene.socket.id) {
                for (let i = 0; i < this.playerDeck.length; i++) {
                    
                    let playerCard = new Card(scene);
                    playerCard.render(200 + (i * 30), innerHeight, this.playerDeck[i]);
                }
            }else {

            };
            /* 
            for (let i = 0; i < this.playerDeck.length; i++) {
                let playerCard = new Card(scene);
                playerCard.render(200 + (i * 30), innerHeight, playerSprites[i]);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(200 + (i * 30), innerHeight*0.2, opponentSprites[i]));
            } */
        }
    }
}