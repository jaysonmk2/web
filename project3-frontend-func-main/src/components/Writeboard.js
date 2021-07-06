import React from 'react'
import { SketchField,Tools } from 'react-sketch';

class Writeboard extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            tool: Tools.pencil ,
            linecolor: 'black',
            linewidth: '4'
        }
    }


    handleSelectTool = (e) =>{
        this.setState({
            tool: e.target.value
        })
        console.log(this.state.tool)
    }

    handleSelectColor = (e) => {
        this.setState({
            linecolor: e.target.value
        })
    }

    render(){
        return (
            <div className="container writeboard">
                <h1>Whiteboard</h1>
                <button value={'red'} onClick={this.handleSelectColor}> red</button>
                <button value={'black'} onClick={this.handleSelectColor}> black</button>
                <button value={Tools.Rectangle} onClick={this.handleSelectTool}>Rectangle</button>
                <button value={Tools.pencil} onClick={this.handleSelectTool}> Pencil</button>

                {/* we have to change the state of sketchfield by making buttons to change the tool*/}
                <SketchField width='1280px'
                             height='1024px' 
                             tool={this.state.tool} 
                             lineColor={this.state.linecolor} 
                             lineWidth={3} />
            </div>
        )
    }
}
export default Writeboard