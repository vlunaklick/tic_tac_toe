const gameBoard = (function(){
    
    const boardID = document.getElementById('container-game');
    const buttonsB = Array.from(document.getElementsByClassName('square'));
    const pFina = document.getElementById('final-msg');
    let turno = 1

    let currState = [["","",""],["","",""],["","",""]]

    const winCondi = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];

    const winState = function(turnos){
        let val;
        let cellA = Array.from(document.getElementsByClassName('square'));
        if(turnos == "O"){
            val = "x"
        } else{
            val = "o"
        }
        if(turno == 10){
            pFina.textContent =  `It's a draw`;
        }
        return winCondi.some((com)=>{
            return com.every(index=>{
                return cellA[index-1].classList.contains(val);
            });
        });
    };

    const marcaSign = function(player,button){
        if (player === "X"){
            button.classList.replace("none","x");
            turno += 1
        } else if (player === "O"){
            button.classList.replace("none","o");
            turno += 1
        }
    };

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

    const winnerAnnounce = function(turnoo,playera,playerb){
        let val;
        if(turnoo == "O"){
            pFina.textContent =  `The winner is ${playera.name}`;
        } else{
            pFina.textContent =  `The winner is ${playerb.name}`;
        }
    }

    return {ocultarBoard, mostrarBoard,resetBoard,marcaSign,whoturno,winState,winnerAnnounce}
})();

const displayGame = (function(){

    gameBoard.ocultarBoard()
    
    const finals = document.getElementById('finals');

    finals.style.display = "none";

    const personFactory = (name,sign,turno) =>{
        return {name,sign,turno}
    }

    gameEnd = false;

    let player1;
    let player2;

    const buttonsD = Array.from(document.getElementsByClassName('square'));

    buttonsD.forEach(function(button){
        button.addEventListener('click',function(){
            if(button.classList[1] == "none" && gameEnd == false){
                gameBoard.marcaSign(gameBoard.whoturno(player1,player2),button);
                if(gameBoard.winState(gameBoard.whoturno(player1,player2))){
                    gameBoard.winnerAnnounce(gameBoard.whoturno(player1,player2),player1,player2,"nada");
                    gameEnd = true
                }
            };
        });
    });

    const playAga = document.getElementById('pagain');

    playAga.addEventListener('click', function(){
        gameBoard.resetBoard();
        gameEnd = false;
    });

    const btnSt = document.getElementById('start-st');
    const menu = document.getElementById('start-menu')

    btnSt.addEventListener('click',function(){
        if(!gameEnd){
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
        }
    });

    const menuP = document.getElementById('menu');

    menuP.addEventListener('click',function(){
        menu.style.display = "";
        finals.style.display = "none";
        gameBoard.ocultarBoard();
        gameEnd = false
    })

    const inputSt = document.getElementById('st1');
    const inputStd = document.getElementById('st2');

})();