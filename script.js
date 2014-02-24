
(function(){

    function surroundingCells(cells, r, c){
        var near = [];
        $.each([[r-1,c-1],[r-1, c],[r-1, c+1],[r, c-1],[r, c+1],[r+1, c-1],[r+1, c],[r+1, c+1]], function(i, v) {
            if(cells[v[0]+'_'+v[1]]){
                near.push(cells[v[0]+'_'+v[1]]);
            }
        });
        return near;
    }

    function init(){
        var size = $('#size').val(),
            bombs = $('#bombs').val(),
            stage = $('#stage').empty(),
            dim = 400 / size,
            bombCells = [],
            cell = 0;

        while(bombs > 0){
            var c = Math.floor(Math.random()*size*size);
            if(bombCells[c] == null){
                bombs -= 1;
                bombCells[c] = true;
            }
        }

        var cells = [];
        for(var row=0; row<size; row++) {
            for(var col=0; col<size; col++) {
                cells[row+'_'+col] = {
                    row : row,
                    col : col,
                    bomb : bombCells[cell++],
                    nearby : 0
                };
            }
        }

        function show(c){
            c.shown = true;
            c.div.addClass('show').html(c.nearby ? c.nearby : '');
        }

        function flag(c){
            if(c.shown) { return; }
            c.flagged = !c.flagged;
            c.div.toggleClass('flagged');
        }

        function clickCell(c){
            if(c.flagged){
                return;
            }
            if(c.bomb){
                c.div.html('!');
                alert('Kaboom!');
            } else {
                if(c.nearby > 0 && !c.shown) {
                    show(c);
                } else {
                    if(c.nearby === 0 && !c.shown){
                        show(c);
                        $.each(surroundingCells(cells, c.row, c.col), function(i, n){
                            clickCell(n);
                        });
                    }
                }
            }
        }

        for(var row= 0, cell=0; row<size; row++) {
            for(var col=0; col<size; col++) {
                var key = row+'_'+col;
                if(!cells[key].bomb) {
                    $.each(surroundingCells(cells,row,col), function(i, val){
                        if(val.bomb){
                            cells[key].nearby += 1;
                        }
                    });
                }
                cells[key].div = $('<div id="'+ key +'" class="cell"/>').width(dim).height(dim)
                    //.html(cells[key].bomb?'<span class="bomb">x</span>':(cells[key].nearby > 0 ? cells[key].nearby : ''))
                    .appendTo(stage).click((function(k){
                        return function(e){
                            if(e.ctrlKey) {
                                flag(cells[k]);
                            } else {
                                clickCell(cells[k]);
                            }
                        };
                    })(key));
            }
        }
    }

    $('#go').click(function(){
        init();
    });

    init();

})();
