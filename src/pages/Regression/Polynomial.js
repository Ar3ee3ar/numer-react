import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import { lusolve, squeeze, sum,pow } from 'mathjs';
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
var x, y, tableTag, regressionMatrixX, regressionMatrixY, matrixA, matrixB, answer,fX_target

class Polynomial extends Component {

    constructor() {
        super();
        x = []
        y = []

        tableTag = []
        this.state = {
            nPoints: 0,
            m: 0,
            X_target: 0,
            array_x_value:[],
            array_y_value:[],
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false,
            CallExam: false
        }
        this.handleChange = this.handleChange.bind(this);


    }
    createTableInput(n, m) {
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
                x: x[i - 1],
                y: y[i - 1]
            })

        }
        regressionMatrixX = new Array(m + 1)
        regressionMatrixY = new Array(m + 1)
        for (i = 1; i <= m + 1; i++) {
            regressionMatrixX[i] = []
            for (var j = 1; j <= m + 1; j++) {
                regressionMatrixX[i][j] = []
            }
        }

        this.setState({
            showInputForm: false,
            showTableInput: true
        })
    }
    initialValue(n, m) {
        x = new Array(m + 1)
        y = []
        for (var i = 1; i <= n; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);

        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
    }
    polynomial(n, m,X_target) {
        var exponent = 1
        //find matrix X
        for (var i = 1; i <= m + 1; i++) {
            for (var j = 1; j <= m + 1; j++) {
                if (i === 1 && j === 1) {
                    regressionMatrixX[i][j] = n
                    continue
                }
                regressionMatrixX[i][j] = this.summation(x, exponent)
                exponent++

            }
            exponent = i
        }
        //find matrix Y
        regressionMatrixY[1] = sum(y)
        for (i = 2; i <= m + 1; i++) {
            regressionMatrixY[i] = this.summationOfTwo(x, y, i - 1)
        }
        console.log(regressionMatrixY)
        this.findX(m,X_target)

    }
    findX(m,X_target) {
        matrixA = new Array(m + 1)
        matrixB = new Array(m + 1)
        for (var i = 0; i < m + 1; i++) {
            matrixA[i] = []
            for (var j = 0; j < m + 1; j++) {
                matrixA[i][j] = regressionMatrixX[i + 1][j + 1]
            }
            matrixB[i] = regressionMatrixY[i + 1]
        }
        answer = squeeze(lusolve(matrixA, matrixB))
        console.log(answer)
        //fx=a0+..+amx^m
        fX_target = answer[0]
        for(i=1;i<m;i++){
            fX_target += answer[i]*pow(X_target,i)
        }
        console.log(fX_target)
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
    summationOfTwo(x, y, exponent) {
        var sum = 0
        for (var i = 1; i < y.length; i++) {
            sum += Math.pow(x[i], exponent) * y[i]
        }
        return sum
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getExam=(e)=>{
        api.getExamByMethod("polynomial regression").then(db=>{
            this.setState({
                nPoints : db.data.data.all_point,
                X_target : db.data.data.x_target,
                array_x_value : db.data.data.array_x,
                array_y_value : db.data.data.array_y,
                m: db.data.data.m,
                CallExam: true
            })
        })
        console.log(this.state.m)
    }

    render() {
        let {X_target} = this.state
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Polynomial Regression</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            {this.state.showInputForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Number of points(n)</h2><Input size="large" name="nPoints" value={this.state.nPoints} style={InputStyle}></Input>
                                    <h2 style={{color:"white"}}>Order(m)</h2><Input size="large" name="m" value={this.state.m} style={InputStyle}></Input><br/><br/>
                                    <Button id="submit_examInput" onClick={this.getExam} style={{ background: "white", color: "#001529" ,float:"left"}}>Example</Button>
                                    <Button id="dimention_button" onClick={
                                        () => this.createTableInput(parseInt(this.state.nPoints), parseInt(this.state.m))}
                                        style={{ background: "#4caf12", color: "white", float:"right" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <h2 style={{color:"white"}}>X</h2><Input size="large" name="X_target" value={this.state.X_target} style={InputStyle}></Input>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white", float:"right" }}
                                        onClick={() => {
                                            this.initialValue(parseInt(this.state.nPoints), parseInt(this.state.m));
                                            this.polynomial(parseInt(this.state.nPoints), parseInt(this.state.m),X_target)
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
export default Polynomial;