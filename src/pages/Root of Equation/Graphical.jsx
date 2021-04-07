import React from 'react';
import {Input ,Card,Button,Table} from 'antd';
import {func} from '../../group_library/lib_use.js';
import Graph from '../../components/Graph'
import 'antd/dist/antd.css';
import '../../style/screen.css'
import api from '../../api'


const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "x",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "y",
        dataIndex: "y",
        key: "y"
    },
];

class Graphical extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fx : "",
          start : 0.0,
          end : 0.0,
            y: 0.0,
          showOutputCard: false,
            showGraph: false,
            moveLeft: false,
            showInputCard: true,
             disabled: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.graphical = this.graphical.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    graphical(start,end){
      var count = 0;
        var data = []
        data['x'] = []
        data['y'] = []
        for(var i = parseInt(this.state.start); i <= parseInt(this.state.end); i++){
            data['x'][count] = i;
            data['y'][count] = func(this.state.fx, i);
            count++;
        }
        this.createTable(data['x'], data['y']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showInputCard : false,
            disabled: true
        })
    }

    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
            });
        }

    };

    resetField =(e)=>{
            this.setState({
                fx : '',
                disabled: false,
                showGraph: false
            });
        }

    getExam=(e)=>{
        api.getExamByMethod("graphical").then(db=>{
            this.setState({
                fx : db.data.data.fx,
                start : db.data.data.xl,
                end : db.data.data.xr
            })
        })
    }
    
    render() {
        let { fx, start, end } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        {<Card
                            title = {<span style={{color:"white"}}>Graphical</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>Start</h2><Input size="large" name="start" value= {this.state.start} style={InputStyle} ></Input>
                            <h2 style={{color:"white"}}>End</h2><Input size="large" name="end" value= {this.state.end} style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.graphical(parseFloat(start), parseFloat(end))
                            }
                                style={{ background: "#4caf12", color: "white" }}>Submit</Button>
                            <Button id="submit_exam" onClick={this.getExam} style={{ background: "white", color: "#001529" , float:"right" }}>Example</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{ background:"red",color:"white", marginLeft:"1%"}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Graphical Method"/>}
                    </div>
                </div>
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title = {<span style={{color:"white"}}>Output</span>}
                            bordered={true}
                            style={{ width: "100%", background: "#001529", color: "#FFFFFFFF" }}
                            id="outputCard"
                        >
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
                </div>
            </div>

        );
    }
}
export default Graphical;
