import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { inv, multiply, sum } from 'mathjs';
import '../../style/screen.css'
import api from '../../api'

const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};
var columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x, y, tableTag, answer, fX_target

class Linear extends Component {

    constructor() {
        super();
        x = []
        y = []

        tableTag = []
        this.state = {
            nPoints: 0,
            X_target:0,
            array_x_value: [],
            array_y_value: [],
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false,
            CallExam: false
        }
        this.handleChange = this.handleChange.bind(this);


    }
    createTableInput(n) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: "70%",
                height: "50%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
                justifyContent: "center"
            }}
                id={"x" + i} key={"x" + i} placeholder={(this.state.CallExam)?this.state.array_x_value[i-1]:"x" + i} />);
            y.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} placeholder={(this.state.CallExam)?this.state.array_y_value[i-1]:"y" + i} />);
            tableTag.push({
                no: i,
                x: x[i - 1],  //skip head table
                y: y[i - 1]   //skip head table
            })

        }

        this.setState({
            showInputForm: false,
            showTableInput: true
        })
    }
    initialValue(n) {
        x = new Array(n + 1)
        y = []
        for (var i = 1; i <= n; i++) {
            x[i] = parseInt(document.getElementById("x" + i).value);

        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
    }
    linear(n,X_target) {
        var matrixX = [2], matrixY = [2], exponent = 0
        for (var i = 0; i < 2; i++) {
            matrixX[i] = []
            for (var j = 0; j < 2; j++) {
                if (i === 0 && j === 0) {
                    matrixX[i][j] = n
                }
                else if (i === 0 && j === 1) {
                    matrixX[i][j] = this.summation(x, 1)
                }
                else {
                    matrixX[i][j] = this.summation(x, exponent + j)
                }
            }
            exponent++
        }
        matrixY[0] = sum(y)
        matrixY[1] = this.summationOfTwo(x, y)
        matrixX = inv(matrixX)
        answer = multiply(matrixY, matrixX)
        //a0+a1(x)
        fX_target = answer[0]+(answer[1]*X_target)
        this.setState({
            showOutputCard: true
        })
    }
    summation(A, exponent) {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += Math.pow(A[i], exponent)
        }
        return sum
    }
    summationOfTwo(A, B) {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += A[i] * B[i]
        }
        return sum
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getExam=(e)=>{
        api.getExamByMethod("linear regression").then(db=>{
            this.setState({
                nPoints : db.data.data.all_point,
                X_target : db.data.data.x_target,
                array_x_value : db.data.data.array_x,
                array_y_value : db.data.data.array_y,
                CallExam: true
            })
        })
    }

    render() {
        let {X_target} = this.state
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Linear Regression</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            {this.state.showInputForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Number of points(n)</h2><Input size="large" name="nPoints" value={this.state.nPoints} style={InputStyle}></Input><br/><br/>
                                    <Button id="submit_examInput" onClick={this.getExam} style={{ background: "white", color: "#001529" ,float:"left"}}>Example</Button>
                                    <Button id="dimention_button" onClick={
                                        () => this.createTableInput(parseInt(this.state.nPoints))}
                                        style={{ background: "#4caf12", color: "white", float:"right" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <h2 style={{color:"white"}}>X</h2><Input size="large" name="X_target" value={this.state.X_target} style={InputStyle}></Input><br/><br/>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white", float:"right" }}
                                        onClick={() => {
                                            this.initialValue(parseInt(this.state.nPoints));
                                            this.linear(parseInt(this.state.nPoints),X_target)
                                        }}
                                    >
                                        Submit
                                </Button>
                                </div>
                            }

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ border: "2px solid black", background: "white none repeat scroll 0% 0%", color: "#001529" }}
                            >
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>y = {fX_target}</p>
                            </Card>
                        }
                    </div>






                </div>


            </div>
        );
    }
}
export default Linear;