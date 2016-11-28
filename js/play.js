//variables para el desarrollo del juego
var map;
var background; //capa del fondo del nivel, contiene cielo, y objetos de no-colision
var collision; //capa con el suelo, y plataformas que colisionan (permiten correr, saltar) al personaje
var cursors; //utilizado para el control de teclas
var runner; //personaje manejado por el usuario
var snake;
var snake2;
var snake3;
var score = 0; //variable para el puntaje que acumula el jugador a lo largo de la partida, valor inicial de 0
var previous;
var skSpeed;
var score = 0;
var maxDistance;
var ramen; //comida que debe recoger el personaje
var tatsu; //punto de finalizacion de la partida
var manda; //enemigos sin movimiento
var directEnemy = 1;
var qramen;
var lefty = true;
var lefty2 = true;
var lefty3 = true;
var play = {

    //esta función carga los recursos necesarios que aparecen en el transcurso del 
    //juego como el mapa (o "mundo") imagen del personaje, etc
    preload: function (){
        game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/generic_platformer_tiles.png');
        game.load.image('ramen', 'assets/images/ramen.png');
        game.load.image('tatsu', 'assets/images/tatsumr.png');
        game.load.image('manda', 'assets/images/mandam.png');

        game.load.spritesheet('runner', 'assets/images/sabio.png', 64,64,16);
        game.load.spritesheet('snake', 'assets/images/snakes.png', 48,48,96);
        game.load.spritesheet('snake2', 'assets/images/snakes.png', 48,48,96);
        game.load.spritesheet('snake3', 'assets/images/snakes.png', 48,48,96);

    }, 

    create: function(){

        // agregar mapa
        map = game.add.tilemap('map');
        map.addTilesetImage('platform', 'tiles'); 

        background = map.createLayer('background');
        collision = map.createLayer('collision');


        //empieza la fisica (tipo arcade)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Hace que el mapa tome el espacio del canvas
        background.resizeWorld();

        // Habilitar las flechas en el teclado
        cursors = game.input.keyboard.createCursorKeys();

        // Crea el personaje en el juego
        this.createRunner();
        this.createEnemies();
        this.createRamen();
        this.createTatsu();
        this.setCollisions();
    },

    setCollisions: function(){
      map.setCollisionBetween(1, 2000, true, 'collision');
    },

    createRunner: function(){
      runner = game.add.sprite(200,280, 'runner');
      game.physics.enable(runner);
      runner.body.tilePadding.set(32);
      game.physics.arcade.gravity.y = 68;
      runner.body.collideWorldBounds = true;
      runner.animations.add('right', [9,10,11], 15, true);
      runner.animations.add('left', [5,6,7], 15, true);

      runner.body.bounce.y = Math.random() * 0.2;
      
      game.camera.follow(runner);
    },

    createEnemies: function(){
        /*
        maxDistance = 4;
        snake = game.add.sprite(650,700,'snake');
        game.physics.enable(snake);
        runner.body.tilePadding.set(32);
        game.physics.arcade.gravity.y = 68;
        previous = snake.body.x;        
        previous = snake.body.x;
        skSpeed = snake.body.velocity.x;

        snake.animations.add('right',[75,76,77],true);
        snake.animations.add('left',[63,64,65],true);*/

        //serpientes con movimiento
        snake = game.add.sprite(1343,450,'snake');
        snake.frame = 54;
        game.physics.enable(snake);
        snake.body.tilePadding.set(32);

        snake.animations.add('right',[78,79,80,78,79,80,78,79,80],8,true);
        snake.animations.add('left',[66,67,68,66,67,68,66,67,68],8,true);

        snake2 = game.add.sprite(2175,450,'snake2');
        snake2.frame = 12;
        game.physics.enable(snake2);
        snake2.body.tilePadding.set(32);

        snake2.animations.add('right',[33,34,35,33,34,35,33,34,35],8,true);
        snake2.animations.add('left',[21,22,23,21,22,23,21,22,23],8,true);

        snake3 = game.add.sprite(2922,450,'snake3');
        snake3.frame = 52;
        game.physics.enable(snake3);
        snake3.body.tilePadding.set(32);

        snake3.animations.add('right',[75,76,77,75,76,77,75,76,77],8,true);
        snake3.animations.add('left',[63,64,65,63,64,65,63,64,65],8,true);

        //----- serpientes estaticas
        manda = game.add.group();
        manda.enableBody = true;

        var staticSnake =  manda.create(921, 700,'manda');
        staticSnake.body.gravity.y = 270;

        staticSnake =  manda.create(1872, 680,'manda');
        staticSnake.body.gravity.y = 270;


        staticSnake =  manda.create(3760 , 700,'manda');
        staticSnake.body.gravity.y = 270;



    },

    createRamen: function() {
        ramen = game.add.group();
        ramen.enableBody = true;

        var food = ramen.create(100, 100,'ramen');

         // Asigna gravedad a los platos de ramen
        food.body.gravity.y = 270;

        // Hace que la comida salte un poco al caer
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(1340, 680, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(2182, 680, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(2822, 680, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(3551, 600, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;


        food = ramen.create(3653, 700, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(3768, 450, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(4125, 450, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(4290, 700, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;
        
        food = ramen.create(4479, 450, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

        food = ramen.create(4656, 715, 'ramen');
        food.body.gravity.y = 70;
        food.body.bounce.y = 0.1 + Math.random() * 0.05;

    },

    createTatsu: function() {
        tatsu = game.add.sprite(4760,480, 'tatsu');
        game.physics.enable(tatsu);
        tatsu.body.tilePadding.set(32);
    },
     update: function () {

        // Colision entre el personaje (jiraiya) y el mapa
        game.physics.arcade.collide(runner, collision);

        // Colision entre la serpiente (estatica) y el mapa
        game.physics.arcade.collide(manda, collision);

        // Colision entre la serpiente (dinamica) y el mapa
        game.physics.arcade.collide(snake, collision);  

        game.physics.arcade.collide(snake2, collision);

        game.physics.arcade.collide(snake3, collision);

        // Colision entre la comida y el mapa
        game.physics.arcade.collide(ramen, collision);

        // Colision entre el personaje - punto de terminacion (tatsu) y el mapa
        game.physics.arcade.collide(tatsu, collision);

        // Colision entre el personaje y el ramen (se llama a collectRamen cuando sucede)
        game.physics.arcade.overlap(runner, ramen, this.collectRamen, null, this);

        // Colision entre el personaje y las serpientes dinamicas(se llama a hitEnemy cuando sucede)
        game.physics.arcade.overlap(runner, snake, this.hitEnemy, null, this);
        game.physics.arcade.overlap(runner, snake2, this.hitEnemy, null, this);
        game.physics.arcade.overlap(runner, snake3, this.hitEnemy, null, this);

        game.physics.arcade.overlap(runner, manda, this.killedByManda, null, this);

        game.physics.arcade.overlap(runner, tatsu, this.endGame, null, this);



        //game.time.events.duration.toFixed(10);
        
        game.time.events.loop(Phaser.Timer.SECOND * 4, this.moveSnake, game);

        game.time.events.loop(Phaser.Timer.SECOND * 4, this.moveSnake2, game);

        game.time.events.loop(Phaser.Timer.SECOND * 4, this.moveSnake3, game);
        //myTimer.delay = 100;

       // this.moveSnake();


        // Colision entre las estrellas y el mapa
        //game.physics.arcade.collide(stars, layer);

        // Si la chica toca hiedra venenosa
        //game.physics.arcade.overlap(girl, poison, this.loose, null, this);

        // Si la chica toca una estrella
        //game.physics.arcade.overlap(girl, stars, this.increaseScore, null, this);

        // Mover a la chica
        this.moveRunner();

    },

    moveRunner: function () {

        // Velocidad inicial --> 0
        runner.body.velocity.x = 0;

        //Se configura velocidad y 'activa' la animacíon correspondiente
        // Al presionar flecha izquierda
        if (cursors.left.isDown) {
            runner.body.velocity.x = -115;
            runner.animations.play('left');
        } else if (cursors.right.isDown) {
            //Al presionar flecha derecha -> 
            runner.body.velocity.x = 115;
            runner.animations.play('right');
        } else if (cursors.down.isDown){
            runner.body.velocity.y = 250;
        }else {
            // Cuando no se hace nada, se detiene
            runner.animations.stop();
            runner.frame = 0;
        }

        // Verificar que el personaje se encuentre parado en el suelo cuando salte
        if (cursors.up.isDown && runner.body.onFloor()) {
            runner.body.velocity.y = -150;
        }

        // Cuando encuentra la posicion de la cueva, se termina
        /*if (girl.body.x >= 1500 && girl.body.y <= 97) {
            game.state.start('end');
        }*/

        // Si cae al agua pierde la partida
        if (runner.body.y >= 850) {
            game.state.start('fallen');
        }
    },

   moveSnake: function(){

        if(snake.body.x <= 1210 || lefty == true){
            snake.body.velocity.x = 45;
            snake.animations.play('right');
            lefty = false;
            
        }else if(snake.body.x >= 1460){
            snake.body.velocity.x = -45;
            snake.animations.play('left');

        }
    },

    moveSnake2: function(){
       
        if(snake2.body.x <= 1980 || lefty2 == true){
            snake2.body.velocity.x = 85;
            snake2.animations.play('right');
            lefty2 = false;
            
        }else if(snake2.body.x >= 2427){
            snake2.body.velocity.x = -80;
            snake2.animations.play('left');

        }
    },

    moveSnake3: function(){
       
        if(snake3.body.x <= 2685 || lefty3 == true){
            snake3.body.velocity.x = 125;
            snake3.animations.play('right');
            lefty3 = false;
            
        }else if(snake3.body.x >= 3165){
            snake3.body.velocity.x = -125;
            snake3.animations.play('left');

        }
    },

    //Acumulación del puntaje de la partida
    collectRamen: function (ramen, runner) {
        runner.kill();
        score += 10;
    },

    hitEnemy: function (snake, runner){
        if(runner.body.touching.up){
            runner.kill();
            score += 30;
        }
        else{
            snake.kill();
            game.state.start('loose');
        }
    },

    killedByManda: function(manda, runner){
        manda.kill();
        game.state.start('loose');
    },

    //Se muestra mensaje cuando el jugador realiza alguna de las acciones que lo hacen perder la partida
    endGame: function () {
        game.state.start('win');
    },


    //Mostrar en pantalla el puntaje acumulado por el jugador
    
    render: function(){
        game.debug.text('Score: ' + score, 32, 64);
    }



}
