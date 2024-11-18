import { LightningElement } from 'lwc';


export default class tictactoe extends LightningElement {
    turn = '0'
    gameover = false
    winner
    changeTurn() {
        return this.turn === "X" ? "0" : "X"
    }
    checkWin() {
        const boxtext = this.template.querySelectorAll(".boxtext")
        const winningRules = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        winningRules.forEach(element => {
             if ((boxtext[element[0]].innerText === boxtext[element[1]].innerText) && (boxtext[element[1]].innerText === boxtext[element[2]].innerText) && (boxtext[element[0]].innerText !== "")) {
                 this.gameover = true
                 this.winner = boxtext[element[0]].innerHTML
             }

        });

    }
    renderedCallback() {
        const boxes = this.template.querySelectorAll(".box");
        Array.from(boxes).forEach(element => {
            const boxtext = element.querySelector('.boxtext');
            element.addEventListener('click', () => {
                if (boxtext.innerText === '') {
                    boxtext.innerText = this.changeTurn();
                    this.turn = this.changeTurn();
                }
                this.checkWin();
            })
        });
    }
}
