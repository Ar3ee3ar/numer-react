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
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        dataIndex: "error",
        key: "error"
    }
];

class One_point_iteration extends React.Component{
    constructor(props){
        super(props);
        this.state={
          fx : "",
          Xpre : 0.0,
          showOutputCard: false,
            showGraph: false,
            moveLeft: false,
            showInputCard: true,
             disabled: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.one_point_iteration = this.one_point_iteration.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }


    one_point_iteration(Xpre){
      var X=0
      var count = 0;
        var data = []
        data['x'] = []
        data['error'] = []
      while(true){
          X = func(this.state.fx,Xpre)
          data['x'][count] = Xpre;
            data['error'][count] = Math.abs((X-Xpre)/X);
            count++;
            if(Xpre === X){
                //console.log(X)
                break;
            }
            else{
                //console.log(X)
                Xpre = X
            }
          //console.log(Xm.toFixed(6));
        }
        //console.log((Xm.toString()).substring(0,8)) //change Float to String make number don't round up
        //console.log("answer: "+Xm)
        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showInputCard : false,
            disabled: true
        })
    }

    createTable(x,error) {
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
    
    render() {
        let { fx, Xpre } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        {<Card
                            title = {<span style={{color:"white"}}>One point iteration</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" value= {this.state.fx} style={InputStyle} disabled = {(this.state.disabled)? "disabled" : ""}></Input>
                            <h2 style={{color:"white"}}>X</h2><Input size="large" name="Xpre" style={InputStyle} ></Input><br/><br/>
                            <Button id="submit_button" onClick={
                                () => this.one_point_iteration(parseFloat(Xpre))
                            }
                                style={{ background: "white", color: "#001529" }}>Submit</Button>
                            {this.state.disabled&&<Button onClick={this.resetField} style={{float:'right'}}>Reset</Button>}
                        </Card>}
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="One point iteration Method"/>}
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
export default One_point_iteration;
