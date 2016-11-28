var fallen = {
    // Cargar imagen de fondo
    preload: function () {
        game.load.image('drownjira', 'assets/images/drownjra.png');
    },

    create: function () {

        // Agregar fondo
        game.add.sprite(0, 0, 'drownjira');

         // Espera a que el jugador presione R para reiniciar el juego
        var rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

        rKey.onDown.addOnce(this.start, this);
    },
     //Llama el estado play y reinicia el juego
    start: function () {
        game.state.start('play');
    }
}