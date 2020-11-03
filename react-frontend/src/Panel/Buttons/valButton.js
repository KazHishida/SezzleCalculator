import React from "react";
import './Button.css';

const operators = '*/-+.';

//If value is freshly calculated, treat it as 0
const isFresh = (calc, val) => {
    if (val==='.') {
        calc.setState({currentEq:'0.', fresh:false});
    }
    else {
        calc.setState({currentEq: val, fresh:false});
    }
}

//Helper function to see if number is already a float
const isFloat = (str) => {
    for (let i=str.length-1; i>=0; i--) {
        if ((operators+")").includes(str.charAt(i))) {
            return str.charAt(i)==='.';
        }
    }
    return false;
}

//Add decimal, with rules for mathematical syntax. If needed, prepend 0 or *0.
const addDec = (calc, val) => {
    let currentEqCopy = calc.state.currentEq;
    if (!isFloat(currentEqCopy)) {
        if (currentEqCopy.slice(-1)===')') {
            currentEqCopy+='*0';
        }
        else if (currentEqCopy.length === 0 || (operators+'(').includes(currentEqCopy.slice(-1))) {
            currentEqCopy+='0';
        }
        currentEqCopy+=val;
    }
    calc.setState({currentEq:currentEqCopy, fresh:false})
}

//Append a number, with rules for mathematical syntax. If needed, prepend *.
const addNum = (calc, val) => {
    let currentEqCopy = calc.state.currentEq;
    if (currentEqCopy.slice(-1) === '0' && (currentEqCopy.length === 0 || operators.includes(currentEqCopy.slice(-2, -1)))) {
        currentEqCopy = currentEqCopy.slice(0, -1);
    }
    else if (currentEqCopy.slice(-1)===')') {
        currentEqCopy+='*';
    }
    currentEqCopy+=val;
    calc.setState({currentEq:currentEqCopy, fresh:false})
}

//Helper function to call the correct function
const delegate = (calc, val) => {
    if (calc.state.fresh) {
        isFresh(calc, val)
    }
    else if (val === '.') {
        addDec(calc, val);
    }
    else {
        addNum(calc, val);
    }
}

const ValButton = props => {
    return (
        <button class = 'CalcButton' id='ValButton' onClick = {() => delegate(props.calc, props.val)}>{props.val}</button>
    );
}
export default ValButton;