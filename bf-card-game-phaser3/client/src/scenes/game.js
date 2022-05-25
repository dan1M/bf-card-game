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
    }

    create() {
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        let self = this;

		this.card = this.add.image(400, 300, 'edea').setScale(0.2).setInteractive();
        this.input.setDraggable(this.card);

        this.dealCards = () => {
        
        }

        this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }
    
    update() {
    
    }
}