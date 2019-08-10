import React, { Component } from 'react'
import axios from "axios"
const WorkContext = React.createContext();

const reducer = (state,action) => {
    switch(action.type){
      case "DELETE_WORK":
        return {
          ...state,
          works : state.works.filter(work => action.payload !== work.id)
        }
      case "ADD_WORK":
        return{
          ...state,
          works : [...state.works,action.payload]
        }
      case "UPDATE_WORK":
        return{
          ...state,
          works : state.works.map(work => work.id === action.payload.id ? action.payload : work)
      }
      default:
        return state
    }
  }

export class WorkProvider extends Component {
    state = {
        works: [],
        dispatch : action => {
          this.setState(state => reducer(state,action))
        }
      }
    componentDidMount = async () =>{
      const response = await axios.get("http://localhost:3004/works")
      this.setState({
        works : response.data
      })
    }
    render() {
        return (
            <div style={{backgroundColor : "#282c34"}}>
                <WorkContext.Provider value = {this.state}>
                    {this.props.children}
                </WorkContext.Provider>
            </div>
        )
    }
}
const WorkConsumer = WorkContext.Consumer;
export default WorkConsumer;