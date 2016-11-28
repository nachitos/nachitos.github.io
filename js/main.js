// Se crea el lienzo donde se carga el juego
var game = new Phaser.Game(950, 700, Phaser.AUTO, 'game');

// Se crean los estados del juego
game.state.add('boot', boot);
game.state.add('play', play);
game.state.add('fallen', fallen);
game.state.add('loose', loose);
game.state.add('win', win);

//se llama para iniciar el primer estado
game.state.start('boot');