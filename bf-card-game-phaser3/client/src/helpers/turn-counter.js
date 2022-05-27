export default class TurnCounter{
    constructor(scene){
        this.counter = 0;
        let title = scene.add.text(75, innerHeight/2-50, ['TURN']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');

        this.min = scene.add.text(130, innerHeight/2-57, ['-']).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({cursor: 'pointer'})
        .on('pointerover', () => {this.min.setColor('#ff69b4')}).on('pointerout', () => {this.min.setColor('#00ffff')});
        
        this.value = scene.add.text(150, innerHeight/2-53, this.counter).setFontSize(24).setFontFamily('Trebuchet MS').setColor('#00ffff');
        
        this.plus = scene.add.text(170, innerHeight/2-57, ['+']).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({cursor: 'pointer'})
        .on('pointerover', () => {this.plus.setColor('#ff69b4')}).on('pointerout', () => {this.plus.setColor('#00ffff')});

        this.min.on('pointerdown', () => {
            scene.socket.emit('turnSub');
        })
        this.plus.on('pointerdown', () => {
            scene.socket.emit('turnAdd');
        })
    }

    add(){
        this.counter++;
        this.value.setText(this.counter)
        if(this.counter >= 10)
            this.plus.setX(185)
    }

    substract(){
        if(this.counter > 0){
            this.counter--;
            this.value.setText(this.counter)
        }
    }
}