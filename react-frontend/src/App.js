import './App.css';
import React, { Component } from 'react';
import RecentCalcs from './Panel/recentCalcs';
import CalcPanel from './Panel/calcPanel';

const HOST = window.location.origin.replace(/^http/, 'ws')

class App extends Component {
    constructor() {
        super();
        this.state = {
            recentCalcs: [],
            currentEq: "0",
            fresh: true
        };
    }

    //Create socket connection
    ws = new WebSocket(HOST + '/ws');
    componentDidMount() {
        
        //Send message on connection to request recentCalcs update
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({'open':'true'}))
            console.log("connected")
        }

        //Update recentCalcs upon broadcast
        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            if (message == null) {
                this.setState({recentCalcs: []})
            }
            else {
                this.setState({recentCalcs: message})
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    render() {

        //Build recent calculations list in reverse order
        let recentCalcs = this.state.recentCalcs.slice(0).reverse().map((e) => {
            return (
                <RecentCalcs todo={e}/>
            );
        });
        
        return (
            <div id="App">
                <div id="Calculator">
                    <div>
                        <textarea rows="1" id = "displayBar"  value = {this.state.currentEq}/>
                    </div>
                    <div>
                        <CalcPanel id= "calcPanel" calc={this} ws={this.ws}/>
                    </div>
                </div>
                <div id="RecentCalcs">
                    <div>
                        <h3 id="RecentCalcsHeader">Recent Calculations</h3>
                        {this.state.recentCalcs.length === 0 ? "No calculations yet!" : <ul id="RecentCalcsList" reversed>{recentCalcs}</ul>}
                    </div>
                    <div>
                        {this.state.recentCalcs.length === 0 ? null : <button id="clearRecent" onClick={() => {this.ws.send(JSON.stringify({'clear':'true'}))}}>Clear</button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;