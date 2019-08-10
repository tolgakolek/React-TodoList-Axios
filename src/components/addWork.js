import React, { Component } from 'react'
import WorkConsumer from "../context";
import axios from "axios";

class addWork extends Component {
    state = {
        workDescription : "",
        checkValue : false,
        error : false
    }
    changeVisibility = (e) => {
        this.setState({
            visible : !this.state.visible
        })
    }
    validateForm = () => {
        const {workDescription}=this.state;
        if (workDescription === ""){
            return false;
        }
        return true;
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addWork = async (dispatch,e) => {
        e.preventDefault();
        const {workDescription,checkValue} = this.state;
        const newWork = {
            workDescription,
            checkValue
        }
        if (!this.validateForm()) {
            this.setState({
                error : true
            })
            return;
        }
        const response = await axios.post("http://localhost:3004/works",newWork)

        dispatch({type : "ADD_WORK",payload:response.data});
    }
    render() {
        const{error} = this.state;
        return <WorkConsumer>
            {
                value => {
                    const {dispatch} = value
                    return (
                        <div className="col-md-8 mb-2">
                            <form onSubmit= {this.addWork.bind(this,dispatch)}>
                                <div className="input-group mb-3">
                                    <input type="text" name="workDescription" className="form-control form-control-lg" placeholder="Enter Another Work" aria-label="Enter Another Work" aria-describedby="button-addon2" onChange={this.changeInput}/>
                                    <div className="input-group-append">
                                    <button className="btn btn-outline-light btn-outline-light-lg" type="submit" id="button-addon2">ADD WORK</button>
                                    </div>  
                                </div>
                            </form> 
                            {
                                error ?
                                <div className = "alert alert-danger">
                                    Please enter work description!
                                </div>
                                 :null
                            }
                        </div>
                    )
                }
            }
            </WorkConsumer>
    }
}
export default addWork;