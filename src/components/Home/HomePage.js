import React from 'react';
import './homepage.css';
import { Image  } from 'semantic-ui-react'



export default function HomePage(props){
    const workersStack = []
    const ids = []
    let top = 0;

    const returnUniqueWorkers = (arr) => {
        for(let i = 0; i < arr.length; i++){
          if(workersStack.length !== 0){
              if(ids.includes(arr[i].id)){
                  continue
              }else{
                  workersStack[top++] = arr[i] 
                  ids.push(workersStack[top -1].id)
              }
          }else{
              workersStack[top++] = arr[i]
              ids.push(workersStack[top -1].id)
          }
        }
    }
    returnUniqueWorkers(props.workers) 

    const handleInputChange1 = () => {
        props.handleChange1(workersStack)
    }

    handleInputChange1()
    return(
        <div className ="homePage">
            <div id="parentDiv" > 
                {workersStack.map((worker, index) => ( 
                    <div className="workerDetail" key={worker.id}>
                       <Image src={workersStack[index].image[index].urls.small} size="small" circular className="img" />
                        <div className="info">
                            <h3>Employee: {worker.name}</h3>
                            <h3>Company: {worker.companyName}</h3>
                            <h3>Email: {worker.email}</h3> 
                            <h3>Total Work Orders: {(worker.work_orders).length}</h3>
                        </div>
                        <div className ="WokersWorkOrders"> 
                            {worker.work_orders.map(order => (
                                <div className= "singleOrder" key ={order.id + order.workerId}>
                                    <h4>Order Name: {order.name}</h4>
                                    <h4>Description: {order.description}</h4>
                                    <h4>Deadline: {order.deadline}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
