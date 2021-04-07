import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import { det, add, subtract, multiply, transpose } from 'mathjs';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import api from '../../api';

const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};

var A = [], B = [], matrixA = [], matrixB = [], matrixX = [], x, epsilon, dataInTable = [], count = 1, output , arrayOutput=[]
var columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "λ",
        dataIndex: "lambda",
        key: "lambda"
    },
    {
        title: "{X}",
        dataIndex: "X",
        key: "X"
    },
    {
        title: "Error",
        dataIndex: "error",
        key: "error"
    }
];
class Gradient extends Component {
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            a_value:[],
            b_value:[],
            initial:[],
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false,
            CallExam : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.conjugate_gradient = this.conjugate_gradient.bind(this);

    }
    positive_definite(dimention) {
        var tempMatrix = []
        for (var i = 0; i < dimention; i++) {
            tempMatrix[i] = []
            for (var j = 0; j < dimention; j++) {
                tempMatrix[i][j] = A[i][j];
            }
        }
        if (det(tempMatrix) <= 0) {
            return false;
        }
        if (dimention !== this.state.row - 1) {
            return this.positive_definite(++dimention);
        }
        return true;
    }

    conjugate_gradient() {
        this.initMatrix();
        if (!this.positive_definite(1)) {
            output = "This matrix doesn't positive definite"
            this.setState({
                showOutputCard: true
            });
            return false;
        }
        //find {R0}
        var R = subtract(multiply(A, x), B);
        console.log(R)
        //find D0
        var D = multiply(R, -1);
        console.log(D)
        do {
            //find λ
            var λ = (multiply(multiply(transpose(D), R), -1)) /
                (multiply(multiply(transpose(D), A), D))
            console.log(λ)
            /*------------------------------------------------------------------*/

            //find new {X}
            x = add(x, multiply(λ, D));
            console.log(x)
            //find new {R}
            R = subtract(multiply(A, x), B);
            console.log(R)
            //find epsilon
            epsilon = Math.sqrt(multiply(transpose(R), R)).toFixed(8);
            this.appendTable(λ, JSON.stringify(x).split(',').join(",\n"), epsilon);
            console.log(epsilon)
            var α = (multiply(multiply(transpose(R), A), D)) /
                multiply(transpose(D), multiply(A, D)).toFixed(8);
            console.log(α)
            D = add(multiply(R, -1), multiply(α, D))
            console.log(D)
        } while (epsilon > 0.000001);
        output = x
        this.setState({
            showOutputCard: true
        });


    }
    createMatrix(row, column) {
        A = []
        B = []
        matrixA = []
        matrixB = []
        matrixX = []
        x = []
        dataInTable = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",
                    backgroundColor: "white",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={(this.state.CallExam)? this.state.a_value[i-1][j-1]:("a"+i+""+j)}/>)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={(this.state.CallExam)? this.state.b_value[i-1]:("b"+i)}/>)
            matrixX.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={(this.state.CallExam)? this.state.initial[i-1]:("x"+i)}/>)


        }

        this.setState({
            showDimentionForm: false,
            showMatrixForm: true,
        })



    }
    initMatrix() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
            x.push(parseFloat(document.getElementById("x" + (i + 1)).value));
        }
    }
    appendTable(lambda, x, error) {
        dataInTable.push({
            iteration: count++,
            lambda: lambda,
            X: x,
            error: error
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getExam=(e)=>{
        api.getExamByMethod("conjugate gradient").then(db=>{
            this.setState({
                row : db.data.data.row,
                column : db.data.data.column,
                a_value : db.data.data.A,
                b_value : db.data.data.B,
                initial : db.data.data.initial,
                CallExam : true
            }
            )
        })
    }

    answerOutput=()=>{
        arrayOutput=[]
        for(let i=0;i<this.state.row;i++){
            arrayOutput.push(<p style={{ fontSize: "24px", fontWeight: "bold" }}>X{i+1}={output[i]}</p>)
            arrayOutput.push(<br/>)
        }
        console.log(arrayOutput)
    }

    render() {
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Conjugate Gradient Iteration Method</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Row</h2><Input size="large" name="row" value={this.state.row} style={InputStyle}></Input>
                                    <h2 style={{color:"white"}}>Column</h2><Input size="large" name="column" value={this.state.column} style={InputStyle}></Input><br/><br/>
                                    <Button id="submit_examInput" onClick={this.getExam} style={{ background: "white", color: "#001529" ,float:"left"}}>Example</Button>
                                    <Button id="dimention_button" onClick={
                                        () => { this.createMatrix(this.state.row, this.state.column) }
                                    }
                                        style={{ background: "#4caf12", color: "white",float:"right" }}>
                                        Submit
                                    </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color:"white"}}>Vector [B]<br /></h2>{matrixB}
                                    <h2 style={{color:"white"}}>Initial X<br /></h2>{matrixX}
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white" }}
                                        onClick={() => {this.conjugate_gradient(parseInt(this.state.row));
                                        this.answerOutput()}}>
                                        Submit
                                    </Button>
                                </div>

                            }
                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <div>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    style={{ background: "white", color: "#001529" }}
                                    onChange={this.handleChange} id="answerCard">
                                    {arrayOutput}
                                </Card>

                            </div>

                        }
                    </div>
                </div>
                {/* <div className="row"> */}
                    {this.state.showOutputCard &&
                        <div>
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ width: "100%", background: "#001529", color: "#FFFFFFFF" }}
                                id="outputCard"
                            >
                                <Table columns={columns} dataSource={dataInTable} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll" }}
                                ></Table>
                            </Card>

                        </div>

                    }
                {/* </div> */}


            </div>
        );
    }
}
export default Gradient;



