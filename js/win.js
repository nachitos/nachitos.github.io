var win = {
    // Cargar imagen de fondo
    preload: function () {
        game.load.image('win', 'assets/images/monte.png');
    },

    create: function () {

        // Agregar fondo
        game.add.sprite(0, 0, 'win');

         // Espera a que el jugador presione R para reiniciar el juego
        var rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

        rKey.onDown.addOnce(this.start, this);
    },
    //Llama al estado del menu principal
    start: function () {
        game.state.start('boot');
    }
}