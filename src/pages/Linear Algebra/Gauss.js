import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import api from '../../api'

const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};

var A = [], B = [], X, matrixA = [], matrixB = [], output = []
class Gauss extends Component {

    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            a_value : [],
            b_value:[],
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false,
            CanType: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.gauss = this.gauss.bind(this);

    }

    gauss(n) {
        this.initMatrix()
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminated
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];
            }
        }
        //Backward Substitution
        X = new Array(n);
        X[n - 1] = B[n - 1] / A[n - 1][n - 1]; //find Xn
        for (i = n - 2; i >= 0; i--) { //find Xn-1 to X1
            var sum = B[i];
            for (j = i + 1; j < n; j++) {
                sum = sum - A[i][j] * X[j];
            }
            X[i] = Math.round(sum / A[i][i]);
        }
        for (i = 0; i < n; i++) {
            output.push("x" + (i + 1) + " = " + X[i]);
            output.push(<br />)
        }

        this.setState({
            showOutputCard: true
        });

    }
    createMatrix(row, column) {
        console.log(this.state.CanType)
        A = []
        B = []
        X = []
        matrixA = []
        matrixB = []
        output = []
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
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={(this.state.CanType)? ("a"+i+""+j):this.state.a_value[i-1][j-1]}/>)
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
                id={"b" + i} key={"b" + i} placeholder={(this.state.CanType)? ("b"+i):this.state.b_value[i-1]} />)


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
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getExam=(e)=>{
        api.getExamByMethod("cholesky decomposition").then(db=>{
            this.setState({
                row : db.data.data.row,
                column : db.data.data.column,
                a_value : db.data.data.A,
                b_value : db.data.data.B,
                CanType: false
            }
            )
        })

    }

    render() {
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Gauss Elimination</span>}
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
                                        () => this.createMatrix(this.state.row, this.state.column)
                                    }
                                        style={{ background: "#4caf12", color: "white" , float:"right"}}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color:"white"}}>Vector [B]<br /></h2>{matrixB}
                                    
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white" ,float:"right"}}
                                        onClick={() => this.gauss(this.state.row)}>
                                        Submit
                                    </Button>
                                </div>
                            }
                        </Card>                        
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={<p style={{ color:"white" }}>Output</p>}
                                bordered={true}
                                style={{ background: "#001529", color: "#FFFFFFFF" }}
                                onChange={this.handleChange} id="answerCard">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                            </Card>
                        }                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Gauss;



