import React from 'react';
import { Input ,Card,Button,Table} from 'antd';
import {func,funcDiff} from '../../group_library/lib_use.js';
import Graph from '../../components/Graph'
import 'antd/dist/antd.css';
import '../../style/screen.css'
import { derivative} from 'mathjs'
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
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Newton_Raphson extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fx : "",
          X : 0.0,
          showOutputCard: false,
            showGraph: false,
            moveLeft: false,
            showInputCard: true,
             disabled: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.newton_Raphson = this.newton_Raphson.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    newton_Raphson(X){
      var error=parseFloat(999.000000);
      var Xnew =0;
      var count = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        //console.log(derivative('7-x^2', 'x').evaluate({x: 4}))
        var use_fx = this.state.fx.split("=")
      do{
          Xnew = X - (func(this.state.fx,X)/derivative(use_fx[1], 'x').evaluate({x: X}))
          error = Math.abs((Xnew-X)/Xnew);
        //   console.log(Xnew)
        //   console.log(error)
        console.log( X+" - ("+func(this.state.fx,X)+"/"+funcDiff(X)+")")
            data['x'][count] = X.toFixed(8);
            data['error'][count] = error.toFixed(8);
            count++;
            X=Xnew
          //console.log(Xm.toFixed(6));
        }while(error>0.000001)
        //console.log((Xm.toString()).substring(0,8)) //change Float to String make number don't round up
        //console.log("answer: "+Xm)
        this.createTable( data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showInputCard : false,
            disabled: true
        })
    }

    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }

    }

    resetField =(e)=>{
            this.setState({
                fx : '',
                disabled: false,
                showGraph: false
            });
        }

    getExam=(e)=>{
        api.getExamByMethod("newton raphson").then(db=>{
            this.setState({
                fx : db.data.data.fx,
                X : db.data.data.x,
            })
        })
    }
    
    render() {
        let { fx, X } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        {<Card
                            title = {<span style={{color:"white"}}>Newton Raphson</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>X</h2><Input size="large" name="X"  value= {this.state.X} style={InputStyle} ></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.newton_Raphson(parseFloat(X))
                            }
                                style={{ background: "#4caf12", color: "white" }}>Submit</Button>
                            <Button id="submit_exam" onClick={this.getExam} style={{ background: "white", color: "#001529" , float:"right" }}>Example</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{ background:"red",color:"white", marginLeft:"1%"}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Newton Raphson Method" />}
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
export default Newton_Raphson;
