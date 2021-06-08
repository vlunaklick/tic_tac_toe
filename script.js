const gameBoard = (function(){
    
    const boardID = document.getElementById('container-game');
    const buttonsB = Array.from(document.getElementsByClassName('square'));
    const pFina = document.getElementById('final-msg');
    let turno = 1


    const marcaSign = function(player,button){
        if (player === "X"){
            button.classList.replace("none","x");
            turno += 1
        } else if (player === "O"){
            button.classList.replace("none","o");
            turno += 1
        }
    }

    const resetBoard = function(){
        buttonsB.forEach((button)=>{
            button.classList.replace('x','none');
            button.classList.replace('o','none');
        });
        pFina.textContent = "";
        turno = 1
    };

    const whoturno = function(player1,player2){
        return turno%2==0 ?  `${player2.sign}` : `${player1.sign}`
    }

    const ocultarBoard = function(){
        boardID.style.display = "none";
        turno = 1
        pFina.textContent = "";
    };

    const mostrarBoard = function(){
        boardID.style.display = "";
        turno = 1
        pFina.textContent = "";
    };

    return {ocultarBoard, mostrarBoard,resetBoard,marcaSign,whoturno}
})();

const displayGame = (function(){

    gameBoard.ocultarBoard()
    
    const finals = document.getElementById('finals');

    finals.style.display = "none";

    const personFactory = (name,sign,turno) =>{
        return {name,sign,turno}
    }

    let player1;
    let player2;

    const buttonsD = Array.from(document.getElementsByClassName('square'));

    buttonsD.forEach(function(button){
        button.addEventListener('click',function(){
            if(button.classList[1] == "none"){
                gameBoard.marcaSign(gameBoard.whoturno(player1,player2),button);
            }
        });
    });

    const playAga = document.getElementById('pagain');

    playAga.addEventListener('click', function(){
        gameBoard.resetBoard();
    });

    const btnSt = document.getElementById('start-st');
    const menu = document.getElementById('start-menu')

    btnSt.addEventListener('click',function(){
        if (inputSt.value != ""){
            player1 = personFactory(inputSt.value,"X",1);
        } else{
            player1 = personFactory("Player 1","X",1);
        }
        if (inputStd.value != ""){
            player2 = personFactory(inputStd.value,"O",2);
        } else{
            player2 = personFactory("Player 2","O",1);
        }
        inputStd.value = "";
        inputSt.value = "";
        gameBoard.resetBoard();
        menu.style.display = "none";
        gameBoard.mostrarBoard();
        finals.style.display = "";
    });

    const menuP = document.getElementById('menu');

    menuP.addEventListener('click',function(){
        menu.style.display = "";
        finals.style.display = "none";
        gameBoard.ocultarBoard();
    })

    const inputSt = document.getElementById('st1');
    const inputStd = document.getElementById('st2');

})();