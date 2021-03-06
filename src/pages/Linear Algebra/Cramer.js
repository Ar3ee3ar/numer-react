import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import { det } from 'mathjs';
import '../../style/screen.css'
import 'antd/dist/antd.css';
import api from '../../api'

const InputStyle = {
    background: "white",
    color: "#001529",
    fontWeight: "bold",
    fontSize: "24px",

};


var A = [], B = [], answer = [], matrixA = [], matrixB = []
class Cramer extends Component {

    constructor() {
        super();
        this.state = {
            row: parseInt(0),
            column: parseInt(0),
            a_value: [],
            b_value: [],
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false,
            CallExam : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);

    }

    cramer() {
        this.initMatrix();
        var counter = 0;
        

        while (counter !== this.state.row) {
            var transformMatrix = JSON.parse(JSON.stringify(A)); //Deep copy
            for (var i = 0; i < this.state.row; i++) {
                for (var j = 0; j < this.state.column; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }

                }

            }
            counter++;
            answer.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(det(transformMatrix)) / Math.round(det(A))}</h2>)
            answer.push(<br />)

        }
        this.setState({
            showOutputCard: true
        });

    }

    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "14%",
                    height: "50%",
                    backgroundColor: "white",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={(this.state.CallExam)? this.state.a_value[i-1][j-1]:("a"+(i)+""+(j))}/>)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={(this.state.CallExam)? this.state.b_value[i-1]:("b"+(i))}/>)
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
                CallExam : true
            })
        })
    }

    render() {
        let { row, column } = this.state;
        return (
            <div className="calBody">
                <div className="row">
                    <div className="col">
                        <Card
                            title = {<span style={{color:"white"}}>Cramer's Rule</span>}
                            bordered={true}
                            style={{ background: "#001529", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h4 style={{color:"white"}}>Row</h4><Input size="large" name="row" value={this.state.row} style={InputStyle}></Input>
                                    <h4 style={{color:"white"}}>Column</h4><Input size="large" name="column" value={this.state.column} style={InputStyle}></Input><br /><br/>
                                    <Button id="submit_examInput" onClick={this.getExam} style={{ background: "white", color: "#001529" ,float:"left"}}>Example</Button>
                                    <Button id="dimention_button" onClick={
                                        () => this.createMatrix(row, column)
                                    }
                                        style={{ background: "#4caf12", color: "white",float:"right" }}>
                                        Submit
                                    </Button>
                                </div>
                            }
                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color:"white"}}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color:"white"}}>Vector [B]<br /></h2>{matrixB}<br/>
                                    <Button
                                        size="large"
                                        id="matrix_button"
                                        style={{ background: "#4caf12", color: "white" ,float:"right"}}
                                        onClick={() => this.cramer()}>
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
                                style={{ width: "100%", background: "white", color: "#001529", float: "left" }}
                                onChange={this.handleChange}>
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{answer}</p>
                            </Card>
                        }
                    </div>
                </div>

            </div>
        );
    }
}
export default Cramer;




