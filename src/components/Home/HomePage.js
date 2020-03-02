import React, { useState, useEffect } from 'react';
import './homepage.css';
import { Image  } from 'semantic-ui-react'



export default function HomePage(props){
    const theWorkers = props.workers[0]
    console.log(theWorkers)
    const workersStack = [[]]
    const ids = []
    let top = 0;
    let currentSrc;

    const [profile, setprofile] = useState({currentImg: null})

    const returnUniqueWorkers = () => {
        for(let i = 0; i < theWorkers.length; i++){
          if(workersStack[0].length !== 0){
              if(ids.includes(theWorkers[i].id)){
                  continue
              }else{
                  workersStack[0][top++] = theWorkers[i]
                  ids.push(workersStack[0][top -1].id)
              }
          }else{
              workersStack[0][top++] = theWorkers[i]
              ids.push(workersStack[0][top -1].id)
          }
        }
        workersStack.push(props.workers[1])
    }
    returnUniqueWorkers() 
    console.log(workersStack)

    // const renderImg = () => {
    //     let currentSrc;
    //     workersStack[1].actualImages.forEach(img => {
    //         currentSrc = img.urls.thumb
    //         setprofile({currentImg: currentSrc})
    //     })
    //     console.log(profile)
    // }

    // useEffect(() => {
    //     renderImg()
    // })
   

    return(
        <div className ="homePage">
            <div id="parentDiv" > 
                {workersStack[0].map((worker, index) => ( 
                    <div className="workerDetail" key={worker.id}>
                        {console.log(workersStack[0][index].image[index])}
                       <Image src={workersStack[0][index].image[index]} size="small" circular className="img" />
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
