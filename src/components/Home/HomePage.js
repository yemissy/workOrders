import React from 'react';
import './homepage.css';
import { Image,   } from 'semantic-ui-react'



export default function HomePage(props){
    console.log(props.workers)
    return(
        <div className ="homePage">
            <div id="parentDiv">
                {props.orders.map( order =>(
                    <div className ="workOrder" key={order.id}>
                        <h2>{order.name}</h2>
                        <p className = "descrip">{order.description}</p>
                    </div>
                ))}
            </div>
           <div id="parentDiv1">
                {props.workers.map(worker => (
                    <div className="workerDetail" >
                        <Image src={worker.image} size="small" circular className="img"/>
                        <div className="info">
                            <h3>{worker.name}</h3>
                            <h4>{worker.companyName}</h4>
                            <h5>{worker.email}</h5>  
                        </div>
                    </div>
            ))}
            </div>

           
        </div>
    )
    
}
