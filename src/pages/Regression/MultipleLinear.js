import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import { lusolve, round, squeeze } from 'mathjs';
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
var x, y, tableTag, fx, regressionMatrixX, regressionMatrixY, matrixA, matrixB, answer ,X_target,X_tValue

class MultipleLinear extends Component {

    constructor() {
        super();
        x = []
        y = []
        X_target = []
        X_tValue = []
        tableTag = []
        this.state = {
            nPoints: 0,
            X: 0,
            array_x_value: [],
            array_y_value: [],
            array_xt_value: [],
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false,
            CallExam: false
        }
        this.handleChange = this.handleChange.bind(this);


    }
    createTableInput(n, X) {
        for (var i = 1; i <= n; i++) {
            x[i] = []
            for (var j = 1; j <= X; j++) {
                x[i].push(<Input style={{
                    width: "70%",
                    height: "50%",
                    backgroundColor: "white",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    justifyContent: "center",
                }}
                    id={"x" + i + "" + j} key={"x" + i + "" + j} placeholder={(this.state.CallExam)?this.state.array_x_value[i-1][j-1]:"x" + i + "" + j} />);
            }
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
                x: x[i],
                y: y[i - 1]
            })

        }
        regressionMatrixX = new Array(X + 1)
        regressionMatrixY = new Array(X + 1)
        for (i = 1; i <= X + 1; i++) {
            regressionMatrixX[i] = []
            for (j = 1; j <= X + 1; j++) {
                regressionMatrixX[i][j] = []
            }
        }
    }

    createTableX_target(X) {
        for (var i = 1; i <= X; i++) {
                X_target.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                    id={"xt" + i} key={"xt" + i} placeholder={(this.state.CallExam)?this.state.array_xt_value[i-1]:("xt"+i)} />);
                    console.log(i)
        }
        this.setState({
            showInputForm: false,
            showTableInput: true,
        })
    }

    initialValue(n, X) {
        x = new Array(X + 1)
        y = []
        X_tValue = []
        for (var i = 1; i <= X; i++) {
            x[i] = []
            for (var j = 1; j <= n; j++) {
                x[i][j] = parseInt(document.getElementById("x" + j + "" + i).value);
            }
        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= X; i++) {
            X_tValue[i] = parseFloat(document.getElementById("xt" + i).value);
        }
    }
    multipleLinear(n, X) {
        for (var i = 1; i <= X + 1; i++) {
            for (var j = i; j <= X + 1; j++) {
                if (i === 1) {
                    if (j === 1) {
                        regressionMatrixX[i][j] = n
                        regressionMatrixY[j] = this.summation(y)
                    }
                    else {
                        regressionMatrixX[i][j] = regressionMatrixX[j][i] = this.summation(x[j - 1])
                        regressionMatrixY[j] = this.summationOfTwo(x[j - 1], y)
                    }


                }
                else {
                    regressionMatrixX[i][j] = regressionMatrixX[j][i] = this.summationOfTwo(x[i - 1], x[j - 1])
                }
            }
        }
        this.findX(n,X)
    }
    findX(n,X) {
        matrixA = new Array(X + 1)
        matrixB = new Array(X + 1)
        for (var i = 0; i < X + 1; i++) {
            matrixA[i] = []
            for (var j = 0; j < X + 1; j++) {
                matrixA[i][j] = regressionMatrixX[i + 1][j + 1]
            }
            matrixB[i] = regressionMatrixY[i + 1]
        }
        answer = squeeze(round(lusolve(matrixA, matrixB)))
        console.log(answer)
        //f(x) = sum(yi-(a0+...+akxki))
        fx = answer[0]
        for(i=1;i<=X;i++){
            fx += answer[i]*X_tValue[i]
        }
        console.log(fx)
        this.setState({
            showOutputCard: true
        })
    }
    summation(A) {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += A[i]
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
        api.getExamByMethod("multiple linear regression").then(db=>{
            this.setState({
                nPoints : db.data.data.all_point,
                array_xt_value : db.data.data.x_multi_target,
                array_x_value : db.data.data.array_x_multi,
                array_y_value : db.data.data.array_y,
                X : db.data.data.x_point,
                CallExam: true
            })
        })
        console.log(this.state.array_xt_value)
    }

    render() {
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Multiple Linear Regression</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            {this.state.showInputForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Number of X</h2><Input size="large" name="X" value={this.state.X} style={InputStyle}></Input>
                                    <h2 style={{color:"white"}}>Number of points(n)</h2><Input size="large" name="nPoints"value={this.state.nPoints} style={InputStyle}></Input><br/><br/>
                                    <Button id="submit_examInput" onClick={this.getExam} style={{ background: "white", color: "#001529" ,float:"left"}}>Example</Button>
                                    <Button id="dimention_button" onClick={
                                        () => {
                                            this.createTableInput(parseInt(this.state.nPoints), parseInt(this.state.X));
                                            this.createTableX_target(parseInt(this.state.X))}}
                                        style={{ background: "#4caf12", color: "white", float:"right" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <h2 style={{color:"white"}}>X_target<br /></h2>{X_target}<br/>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white", float:"right" }}
                                        onClick={() => {
                                            this.initialValue(parseInt(this.state.nPoints), parseInt(this.state.X));
                                            this.multipleLinear(parseInt(this.state.nPoints), parseInt(this.state.X))
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
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>fx={fx}</p>

                            </Card>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default MultipleLinear;