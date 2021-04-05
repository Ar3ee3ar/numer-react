import React from 'react';
import { Row, Col,Input ,Card,Button,Table} from 'antd';
import {func} from '../../group_library/lib_use.js';
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
        title: "x0",
        dataIndex: "x0",
        key: "x0"
    },
    {
        title: "X1",
        dataIndex: "x1",
        key: "x1"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Secant extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fx : "",
          x0 : 0.0,
          X1 : 0.0,
          showOutputCard: false,
            showGraph: false,
            moveLeft: false,
            showInputCard: true,
             disabled: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.secant = this.secant.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    secant(X0,X1){
      var error=parseFloat(999.000000);
      var Xnew=0;
      var count = 0;
        var data = []
        data['x0'] = []
        data['x1'] = []
        data['error'] = []
      do{
          Xnew = X0-((func(this.state.fx,X0)*(X0-X1))/(func(this.state.fx,X0)-func(this.state.fx,X1)))
          error = Math.abs((Xnew-X1)/Xnew)
            data['x0'][count] = X0;
            data['x1'][count] = X1;
            data['error'][count] = error.toFixed(8);
            count++;
            X0 = X1
            X1 = Xnew
          //console.log(Xm.toFixed(6));
        }while(error>0.000001)
        //console.log((Xm.toString()).substring(0,8)) //change Float to String make number don't round up
        //console.log("answer: "+Xm)
        this.createTable(data['x0'], data['x1'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showInputCard : false,
            disabled: true
        })
    }

    createTable(x0, x1,  error) {
        dataInTable = []
        for (var i = 0; i < x0.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x0: x0[i],
                x1: x1[i],
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
        let { fx, x0, x1 } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        {<Card
                            title = {<span style={{color:"white"}}>Secant</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle} ></Input>
                            <h2 style={{color:"white"}}>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.secant(parseFloat(x0), parseFloat(x1))
                            }
                                style={{ background: "white", color: "#001529" }}>Submit</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{float:'right'}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Secant Method" x0={x0} x1={x1} />}
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
export default Secant;
