import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import { lusolve, format } from 'mathjs';
import api from '../../api'

const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};

var A = [], B = [], matrixA = [], matrixB = [], output = [], decompose;
class LU extends Component {

    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            a_value: [],
            b_value: [],
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false,
            CallExam: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.Lu = this.Lu.bind(this);

    }

    Lu() {
        this.initMatrix();
        decompose = lusolve(A, B)
        for (var i = 0; i < decompose.length; i++) {
            output.push(Math.round(decompose[i]));
            output.push(<br />)
        }
        this.setState({
            showOutputCard: true
        });


    }

    printFraction(value) {
        return format(value, { fraction: 'ratio' })
    }

    createMatrix(row, column) {
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
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={(this.state.CallExam)?this.state.a_value[i-1][j-1]:"a" + i + "" + j} />)
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
                id={"b" + i} key={"b" + i} placeholder={(this.state.CallExam)?this.state.b_value[i-1]:"b" + i} />)


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
        api.getExamByMethod("LU decomposition").then(db=>{
            this.setState({
                row : db.data.data.row,
                column : db.data.data.column,
                a_value : db.data.data.A,
                b_value : db.data.data.B,
                CallExam : true
            })
        })
    }

    render() {
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>LU Decomposition</span>}
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
                                        style={{ background: "#4caf12", color: "white",float:"right" }}>
                                        Submit
                                </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color:"white"}}>Vector [B]<br /></h2>{matrixB}
                                    
                                <Button
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white"}}
                                        onClick={() => this.Lu()}>
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
                                style={{ color: "#001529", backgrounf: "#FFFFFFFF" }}
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
export default LU;



