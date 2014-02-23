
(function(){

    function init(){
        var size = $('#size').val(),
            bombs = $('#bombs').val(),
            stage = $('#stage').empty(),
            dim = 400 / size,
            bombCells = {};

        while(bombs > 0){
            var c = Math.floor(Math.random() * size*size);
            if(bombCells[c] == null){
                bombs -= 1;
                bombCells[c] = true;
            } else {
                console.log('duplicate detected');
            }
        }

        for(var y=0; y<size; y++) {
            for(var x=0; x<size; x++) {
                $('<div class="cell"/>').width(dim).height(dim)
                    .data({x:x,y:y})
                    .text(bombCells[(x*y)]?'x':'')
                    .appendTo(stage);
            }
        }
    }

    $('#go').click(function(){
        init();
    });

    init();

})();
