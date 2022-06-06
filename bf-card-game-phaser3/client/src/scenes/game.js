import Card from '../helpers/card';
import Zone from '../helpers/zone';
import Dealer from '../helpers/dealer';
import TurnCounter from '../helpers/turn-counter';

import io from 'socket.io-client';


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('yan-yuan', 'src/assets/yan-yuan.png');
        this.load.image('ydra', 'src/assets/ydra.png');
        this.load.image('edea', 'src/assets/edea.png');
        this.load.image('vargas', 'src/assets/VARGAS.png');
        this.load.image('alice', 'src/assets/ALICE.png');
        this.load.image('atro', 'src/assets/ATRO.png');
        this.load.image('bayley', 'src/assets/BAYLEY.png');
        this.load.image('cayena', 'src/assets/CAYENA.png');
        this.load.image('elimo', 'src/assets/ELIMO.png');
        this.load.image('eze', 'src/assets/EZE.png');
        this.load.image('fennia', 'src/assets/FENNIA.png');        
        this.load.image('lance', 'src/assets/LANCE.png');    
        this.load.image('lava', 'src/assets/LAVA.png');  
        this.load.image('lico', 'src/assets/LICO.png'); 
        this.load.image('lilith', 'src/assets/LILITH.png');
        this.load.image('loch', 'src/assets/LOCH.png');
        this.load.image('magress', 'src/assets/MAGRESS.png');
        this.load.image('selena', 'src/assets/SELENA.png');
        this.load.image('serin', 'src/assets/SERIN.png');
        this.load.image('vanila', 'src/assets/VANILA.png');
        
        // ajouter les nouvelles cartes
    }

    create() {
        let self = this;

        this.isPlayerA = false;

        this.dealer = new Dealer(this);

        this.zone = new Zone(this);

        // Player 1 cards
        this.dropZoneP1c1 = this.zone.renderZone(2.5*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c1);

        this.dropZoneP1c2 = this.zone.renderZone(3.8*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c2);
        
        this.dropZoneP1c3 = this.zone.renderZone(5.1*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c3);

        this.dropZoneP1c4 = this.zone.renderZone(6.4*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c4);

        this.dropZoneP1c5 = this.zone.renderZone(7.7*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c5);

        this.dropZoneP1c6 = this.zone.renderZone(9*innerWidth/12, innerHeight/1.7, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP1c6);

        // Player 2 cards
        this.dropZoneP2c1 = this.zone.renderZone(2.5*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c1);

        this.dropZoneP2c2 = this.zone.renderZone(3.8*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c2);
        
        this.dropZoneP2c3 = this.zone.renderZone(5.1*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c3);

        this.dropZoneP2c4 = this.zone.renderZone(6.4*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c4);

        this.dropZoneP2c5 = this.zone.renderZone(7.7*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c5);

        this.dropZoneP2c6 = this.zone.renderZone(9*innerWidth/12, innerHeight/5, 150, 220);
        this.outline = this.zone.renderOutline(this.dropZoneP2c6);

        

        // Multiplayer handle
        this.socket = io('https://bf-card-game.herokuapp.com/');

        this.socket.on('connect', function () {
        	console.log('Connected! '+self.socket.id);
            self.socket.emit('dealDeck', self.socket.id, self.dealer.deck);
        });

        this.socket.on('dealCards', (socketId, cards) => {
            if(socketId === self.socket.id){
                //console.log('cartes recues: ', cards)
                for (let i in cards){
                    self.dealer.playerDeck.push(cards[i]);
                }
            }else{
                for (let i in cards){
                    self.dealer.opponentDeck.push(cards[i]);
                }
            }
            self.dealer.dealCards(socketId);
            self.dealText.disableInteractive();
        })

        

        this.socket.on('cardPlayed', function (socketId, cards) {
            if(socketId === self.socket.id){
                console.log('main recue : ', cards)
                for (let i in cards){
                    self.dealer.playerHand.push(cards[i]);
                }
            }else{
                console.log('main recue adv : ', cards)
                for (let i in cards){
                    self.dealer.opponentHand.push(cards[i]);

                    let card = new Card(self);
                    console.log("test");
                    card.render(eval('self.dropZoneP2c'+cards.length+'.x'), eval('self.dropZoneP2c'+cards.length+'.y'), cards[cards.length-1]);
                    
                }
            }

            
            /* if (socketId !== self.socket.id) {
                let sprite = gameObject.textureKey;
                //self.opponentCards.shift().destroy();
                let card = new Card(self);
                card.render(self.dropZone.x, (self.dropZone.y), sprite).disableInteractive();
            } */
        })

        this.socket.on('turnAdd', () => {
            self.turnCounter.add();
        })

        this.socket.on('turnSub', () => {
            self.turnCounter.substract();
        })



        // 'Deal' button
        this.dealText = this.add.text(75, innerHeight/2, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({cursor: 'pointer'});
        
        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards", self.socket.id, self.dealer.deck);    // signal to server to emit dealcards       
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        // 'Turn counter' object

        this.turnCounter = new TurnCounter(this);   

        
        // Input events
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            //self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY; 
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            
            console.log(gameObject.frame.texture.key)
            self.socket.emit('cardPlayed', gameObject.frame.texture.key, self.socket.id);
        })

    }
    
    update() {
    }
}