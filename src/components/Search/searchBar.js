import React from 'react'
import { Search, Button,  } from 'semantic-ui-react'

import './search.css'

export default function searchBar(props){
    return(
        <div className ="SearchBar">
            <Search size="big" onSearchChange={props.handleChange} onSearchChange={props.handleSelect}/>
            <h5 className ="toggle">Earliest First</h5>
            <h5 className ="toggle">Latest First</h5>
            <div className = "Button">
                <Button attached="left" toggle></Button>
                <Button attached="right" toggle></Button>
            </div>
        </div>
    )
}