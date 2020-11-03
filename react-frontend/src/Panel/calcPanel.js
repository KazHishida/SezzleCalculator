import React from "react";
import ValButton from './Buttons/valButton';
import OpButton from './Buttons/opButton';
import OtherButton from './Buttons/otherButton';
import './calcPanel.css';

const CalcPanel = props => {
    return (
        <div id="CalcPanel">
                <OtherButton calc={props.calc} op = {'AC'}/>
                <OtherButton calc={props.calc} op = {'CE'}/>
                <OpButton calc={props.calc} op = {'()'}/>
                <OpButton calc={props.calc} op = {'/'}/>
                <ValButton calc={props.calc} val = {'7'}/>
                <ValButton calc={props.calc} val = {'8'}/>
                <ValButton calc={props.calc} val = {'9'}/>
                <OpButton calc={props.calc} op = {'*'}/>
                <ValButton calc={props.calc} val = {'4'}/>
                <ValButton calc={props.calc} val = {'5'}/>
                <ValButton calc={props.calc} val = {'6'}/>
                <OpButton calc={props.calc} op = {'-'}/>
                <ValButton calc={props.calc} val = {'1'}/>
                <ValButton calc={props.calc} val = {'2'}/>
                <ValButton calc={props.calc} val = {'3'}/>
                <OpButton calc={props.calc} op = {'+'}/>
                <OpButton calc={props.calc} op = {'+/-'}/>
                <ValButton calc={props.calc} val = {'0'}/>
                <ValButton calc={props.calc} val = {'.'}/>
                <OtherButton calc={props.calc} ws={props.ws} op = {'='}/>
        </div>
    );
}
export default CalcPanel;