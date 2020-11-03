import React from "react";
import './Button.css';

const operators = '*/-+.';

//Helper function to count defecit of parentheses.
const countDeficit = (str) => {
    let left = 0;
    let right = 0;
    for (let i=0; i<str.length; i++) {
        if (str.charAt(i)==='(') {
            left++;
        }
        else if (str.charAt(i)===')') {
            right++;
        }
    }
    return left-right;
}

//Add plus or minus. If either is the most recent operator, change to the opposite. If before a different operator, prepend an opening parenthesis.
const plusMin = (calc) => {
    let currentEqCopy = calc.state.currentEq;
    for (let i=currentEqCopy.length-1; i>=0; i--) {
        if ('-+'.includes(currentEqCopy.charAt(i))) {
            currentEqCopy = currentEqCopy.slice(0, i) + (currentEqCopy.charAt(i) === '+' ? '-' : '+') + currentEqCopy.slice(i+1);
            break;
        }
        else if (operators.slice(0, -1).includes(currentEqCopy.charAt(i))) {
            currentEqCopy = currentEqCopy.slice(0, i+1) + "(-" + currentEqCopy.slice(i+1);
            break;
        }
        else if (currentEqCopy.charAt(i)==='(' || currentEqCopy.charAt(i)===')') {
            currentEqCopy = currentEqCopy.slice(0, i+1) + "-" + currentEqCopy.slice(i+1);
            break;
        }
        else if (i===0) {
            currentEqCopy = "-" + currentEqCopy;
        }
    }
    calc.setState({currentEq:currentEqCopy, fresh:false})
}

//Add parenthesis. Only aim to close if there is a deficit. Then, only close if succeeding a number, otherwise open a new parenthesis. Prepend * if needed.
const addPara = (calc) => {
    let currentEqCopy = calc.state.currentEq;
    if (countDeficit(currentEqCopy)) {
        if (currentEqCopy.slice(-1)==='(' || operators.includes(currentEqCopy.slice(-1))) {
            if (currentEqCopy.slice(-1)==='.') {
                currentEqCopy = currentEqCopy.slice(0, -1);
                currentEqCopy = currentEqCopy+'*';
            }
            currentEqCopy = currentEqCopy+'(';
        }
        else {
            currentEqCopy = currentEqCopy+')';
        }
    }
    else {
        if (currentEqCopy.slice(-1)==='.') {
            currentEqCopy = currentEqCopy.slice(0, -1);
        }
        if (!operators.slice(0, -1).includes(currentEqCopy.slice(-1))) {
            currentEqCopy = currentEqCopy+'*';
        }
        currentEqCopy = currentEqCopy+'(';
    }
    calc.setState({currentEq:currentEqCopy, fresh:false})
}

//Add an operator. Never have two back to back operators, or an operator immediately after an opening parenthesis. 
const addOp = (calc, Op) => {
    let currentEqCopy = calc.state.currentEq;
    if (currentEqCopy.length !== 0 && currentEqCopy.slice(-1)!=='(' && !(currentEqCopy.slice(-2, -1)==='(' && operators.includes(currentEqCopy.slice(-1)))) {
            if (operators.includes(currentEqCopy.slice(-1))) {
                    currentEqCopy = currentEqCopy.slice(0, -1);
            }
            currentEqCopy += Op;
    }
    calc.setState({currentEq:currentEqCopy, fresh:false})
}

//Helper function to call the correct function
const delegate = (calc, Op) => {
    if (Op === '+/-') {
        plusMin(calc);
    }
    else if (Op === '()') {
        addPara(calc);
    }
    else {
        addOp(calc, Op);
    }
}

const OpButton = props => {
    return (
        <button class = 'CalcButton' id='OpButton' onClick = {() => delegate(props.calc, props.op)}>{props.op}</button>
    );
}
export default OpButton;