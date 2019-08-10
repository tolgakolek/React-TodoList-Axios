import React, { Component } from 'react';
import Work from "./work";
import WorkConsumer from "../context";
class works extends Component {
    render() {
        return(
            <WorkConsumer>
                {
                    value => {
                        const {works} = value;
                        return (
                            <div>
                            {
                                works.map(work => {
                                    return (
                                        <Work
                                            key = {work.id}
                                            id = {work.id}
                                            workDescription = {work.workDescription}
                                            checkValue = {work.checkValue}
                                        />
                                    )
                                })
                            }
                            </div>
                        )
                    }
                }
            </WorkConsumer>
        )
    }
}
export default works;