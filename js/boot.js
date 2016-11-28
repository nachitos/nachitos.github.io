var boot = {
  // Cargar imagen de fondo
    preload: function () {
        game.load.image('background', 'assets/images/menu.png');
    },
    create: function () {

        // Agregar fondo
        game.add.sprite(0, 0, 'background');

        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        enterKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}