import React from "react";
import './Button.css';
import {evaluate} from 'mathjs';

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

//Calculate current input and send to server
const calculate = (calc, ws) => {
        let currentEqCopy = calc.state.currentEq;
        if (!operators.includes(currentEqCopy.slice(-1)) && currentEqCopy.slice(-1)!=='(') {
            let deficit = countDeficit(currentEqCopy)
            for (let i = 0; i < deficit; i++) {
                currentEqCopy += ")";
            }
        }
        //Evaluate using math.js. This should be more protected than eval(), input is controlled, and input is only ever evaluated locally. Should be safe?
        try {
            let currentAns = evaluate(currentEqCopy);
            let x = {'recentCalc': currentEqCopy + '=' + String(currentAns)}
            //If the calculation was successful, send it to the server to broadcast to everyone else.
            try {
                ws.send(JSON.stringify(x));
            } catch(error) {
                console.log(error)
            }
            calc.setState({currentEq: String(currentAns), fresh:true});
        } catch {console.log("Invalid equation")}
}

//Clear one entry
const clear = (calc) => {
    let currentEqCopy = calc.state.currentEq;
    currentEqCopy = currentEqCopy.slice(0, -1);
    calc.setState({currentEq:currentEqCopy ? currentEqCopy : "0", fresh:false})
}

//Clear all entries
const allClear = (calc) => {
    calc.setState({currentEq:"0", fresh:false})
}

//Helper function to call correct function
const delegate = (calc, op, ws) => {
    if (op === '=') {
        calculate(calc, ws);
    }
    else if (op === 'CE') {
        clear(calc);
    }
    else {
        allClear(calc);
    }
}

const OtherButton = props => {
    return (
        <button class = 'CalcButton' id='OtherButton' onClick = {() => delegate(props.calc, props.op, props.ws)}>{props.op}</button>
    );
}
export default OtherButton;