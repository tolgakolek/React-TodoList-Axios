import React, { Component } from 'react'
import WorkConsumer from "../context"
import axios from "axios"
import PropTypes from 'prop-types'

class work extends Component { 
    state = {
        checkValue : null,
        workDescription : ""
    }
    onClickEvent = (e) =>{
        this.setState({
            checkValue : !this.state.checkValue,
            workDescription : this.state.workDescription
        })
    }
    componentDidMount= () =>{
        const {workDescription,checkValue}= this.props;
        this.setState({
            checkValue : !checkValue,
            workDescription : workDescription
        })
    }
    onDeleteWork = async (dispatch,e) => {
        const {id} = this.props;
        // Delete Request
        await axios.delete(`http://localhost:3004/works/${id}`);
        // Consumer Dispatch
        dispatch ({type : "DELETE_WORK",payload:id});
    }
    updateWork = async (dispatch,e) => {
        e.preventDefault();
        //update user
        const {workDescription,checkValue} = this.state;
        const {id}= this.props;
        const updatedWork = {
            workDescription,
            checkValue
        };
        const response = await axios.put(`http://localhost:3004/works/${id}`,updatedWork);
        dispatch({type: "UPDATE_WORK",payload: response.data});
    }
    render() {
        const {workDescription,checkValue}= this.props;
        return (
        <WorkConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-lg-12 mb-2" >
                            <div className="card" style = {{backgroundColor: "gray"}} onClick={this.onClickEvent.bind(this)}>
                                <div className="card-header d-flex justify-content-between" style = {checkValue ? {backgroundColor:"green"}:{backgroundColor:"gray"}} >
                                    <input className="mr-4 ml-4" type = "checkbox" style = {{lineHeight:"normal",marginTop:"auto",marginBottom:"auto"}} onChange={this.updateWork.bind(this,dispatch)}  checked={checkValue}/>
                                    <h4 style={{wordBreak: "break-word"}}>{workDescription}</h4>
                                    <i onClick={this.onDeleteWork.bind(this,dispatch)} className="far fa-trash-alt ml-4" style={{cursor : "pointer",marginTop:"auto",marginBottom:"auto"}}></i>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </WorkConsumer>
        )
    }
}
work.defaultProps = {
    workDescription : "Yazılmadı",
    checkValue : false
}
work.propTypes = {
    workDescription : PropTypes.string.isRequired,
    checkValue : PropTypes.bool.isRequired,
    id : PropTypes.string.isRequired
}
export default work;