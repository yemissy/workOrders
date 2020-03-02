import React from 'react'
import { Search, Button,  } from 'semantic-ui-react'

import './search.css'

export default function searchBar(props){
    return(
        <div className ="SearchBar">
            <Search size="small"  onSearchChange={props.handleChange} value={props.value} />
            <div className ="Buttons">
                <Button.Group>
                    <Button attached="left" toggle>Earliest</Button>
                    <Button.Or/>
                    <Button attached="right" toggle>Latest </Button>
                </Button.Group>
            </div>
        </div>
    )
}