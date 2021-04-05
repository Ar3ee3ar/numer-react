import React from 'react';
import { Row, Col,Input ,Card,Button,Table} from 'antd';
import {func,error} from '../../group_library/lib_use.js';
import Graph from '../../components/Graph'
import 'antd/dist/antd.css';
import '../../style/screen.css'


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
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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

class False_position extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fx : "",
          Xl : 0.0,
          Xr : 0.0,
          showOutputCard: false,
            showGraph: false,
            moveLeft: false,
            showInputCard: true,
             disabled: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.false_position = this.false_position.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    false_position(Xl,Xr){
      var increaseFunction = false;
      var error=parseFloat(999.000000);
      var X1 = 0;
      var count = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        X1 = (Xl*func(this.state.fx,Xr) - Xr*func(this.state.fx,Xl))/(func(this.state.fx,Xr)-func(this.state.fx,Xl))
        console.log(X1);
        console.log(func(this.state.fx, X1))
        if(func(this.state.fx, X1)<0.000001){
            error= Math.abs(func(this.state.fx, X1))
            data['xl'][count] = Xl;
            data['xr'][count] = Xr;
            data['x'][count] = X1.toFixed(8);
            data['error'][count] = Math.abs(error).toFixed(8);
        }
        else  if (func(this.state.fx, X1) < 0) {
            increaseFunction = true;
            do{
          X1 = (Xl*func(this.state.fx,Xr) - Xr*func(this.state.fx,Xl))/(func(this.state.fx,Xr)-func(this.state.fx,Xl))
            if (func(this.state.fx, X1) * func(this.state.fx, Xr) < 0) {
                error = error(X1, Xr);
                if (increaseFunction) {
                    Xl = X1;
                }
                else {
                    Xr = X1;
                }

            }
            else {
                error = error(X1, Xl);
                if (increaseFunction) {
                    Xr = X1;
                }
                else {
                    Xl = X1;
                }

            }
            
            data['xl'][count] = Xl;
            data['xr'][count] = Xr;
            data['x'][count] = X1.toFixed(8);
            data['error'][count] = error.toFixed(8);
            count++;
          console.log(X1.toFixed(6));
        }while(Math.abs(error)>0.000001)
        }
        //console.log((Xm.toString()).substring(0,8)) //change Float to String make number don't round up
        //console.log("answer: "+Xm)
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showInputCard : false,
            disabled: true
        })
    }

    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
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
    
    render() {
        let { fx, xl, xr } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        {<Card
                            title = {<span style={{color:"white"}}>False position</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle} ></Input>
                            <h2 style={{color:"white"}}>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.false_position(parseFloat(xl), parseFloat(xr))
                            }
                                style={{ background: "white", color: "#001529" }}>Submit</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{float:'right'}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="False position Method" xl={xl} xr={xr} />}
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
export default False_position;
