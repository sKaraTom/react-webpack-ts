import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }
export interface HelloState {
    randomNumber: number
}

export class Hello extends React.Component<HelloProps, HelloState> {

    constructor(props: HelloProps) {
        super(props);
        this.state = {
            randomNumber: 1
        }
    }

    handleClick = () => {
        const randomNumber = Math.floor(Math.random() * Math.floor(100));
        this.setState({randomNumber});
    }

    render() {
        return <React.Fragment>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        <div>{this.state.randomNumber}</div>
        <button style={{ color:"blue" }} onClick={this.handleClick}>my button</button>
        
        </React.Fragment>;
    }
}