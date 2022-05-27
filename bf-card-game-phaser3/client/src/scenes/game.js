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
        this.load.image('vargas', 'src/assets/vargas.png');
        this.load.image('alice', 'src/assets/alice.png');
        this.load.image('atro', 'src/assets/atro.png');
        this.load.image('bayley', 'src/assets/bayley.png');
        this.load.image('cayena', 'src/assets/cayena.png');
        this.load.image('elimo', 'src/assets/elimo.png');
        this.load.image('eze', 'src/assets/eze.png');
        this.load.image('fennia', 'src/assets/fennia.png');        
        this.load.image('lance', 'src/assets/lance.png');    
        this.load.image('lava', 'src/assets/lava.png');  
        this.load.image('lico', 'src/assets/lico.png'); 
        this.load.image('lilith', 'src/assets/lilith.png');
        this.load.image('loch', 'src/assets/loch.png');
        this.load.image('magress', 'src/assets/magress.png');
        this.load.image('selena', 'src/assets/selena.png');
        this.load.image('serin', 'src/assets/serin.png');
        this.load.image('vanila', 'src/assets/vanila.png');
    }

    create() {
        let self = this;

        this.isPlayerA = false;
        this.opponentCards = [];

        console.log(Object.keys(this.textures.list))
        this.dealer = new Dealer(this);           
        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone(innerWidth/2, innerHeight/2, 1000, 260);
        this.outline = this.zone.renderOutline(this.dropZone);

        // Multiplayer handle
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
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
            self.socket.emit("dealCards");    // signal to server to emit dealcards       
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
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })

    }
    
    update() {
    }
}