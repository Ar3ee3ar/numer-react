import React from 'react';
import {Input ,Card,Button,Table} from 'antd';
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

class Bisection extends React.Component{
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
        this.bisection = this.bisection.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    bisection(Xl,Xr){
      var increaseFunction = false;
      var error=parseFloat(999.000000);
      var Xm=(Xl+Xr)/2.0;
      var count = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
      if (func(this.state.fx, Xl) < func(this.state.fx, Xr)) {
        increaseFunction = true;
      }
      do{
          Xm = (Xl + Xr) / 2;
            if (func(this.state.fx, Xm) * func(this.state.fx, Xr) < 0) {
                error = Math.abs((Xm - Xr) / Xr);
                if (increaseFunction) {
                    Xl = Xm;
                }
                else {
                    Xr = Xm;
                }

            }
            else {
                error = Math.abs((Xm - Xl) / Xm);
                if (increaseFunction) {
                    Xr = Xm;
                }
                else {
                    Xl = Xm; 
                }
            }
            data['xl'][count] = Xl;
            data['xr'][count] = Xr;
            data['x'][count] = Xm.toFixed(8);
            data['error'][count] = error.toFixed(8);
            count++;
          //console.log(Xm.toFixed(6));
        }while(error>0.000001)
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
                            title = {<span style={{color:"white"}}>Bisection</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle} ></Input>
                            <h2 style={{color:"white"}}>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.bisection(parseFloat(xl), parseFloat(xr))
                            }
                                style={{ background: "white", color: "#001529" }}>Submit</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{float:'right'}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Bisection Method"/>}
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
export default Bisection;
