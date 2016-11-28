var boot = {
  
    preload: function () {
    	// Cargar imagen de fondo para este esteado
        game.load.image('background', 'assets/images/menu.png');
        
    },
    create: function () {

        // Agregar fondo (cargando el sprite correspondiente)
        game.add.sprite(0, 0, 'background');

        

        // Espera a que el jugador presione ENTER para iniciar el juego
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        enterKey.onDown.addOnce(this.start, this);
    },
    //Llamado del siguiente estado (play: donde se encuentra toda la lógica del juego)
    start: function () {
        game.state.start('play');
    }
}