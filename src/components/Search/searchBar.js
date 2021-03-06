import React from 'react'
import { Search, Button,  } from 'semantic-ui-react'

import './search.css'

export default function searchBar(props){
    return(
        <div className ="SearchBar">
            <Search size="small" 
            loading={props.loading} 
            onSearchChange={props.handleChange} 
            value={props.value} 
            results={props.Searchresults}
            onResultSelect={props.handleResult}
            />
             <h5 id="prompt">Search employee's name</h5>
             {/* Work on Buttons sorting later */}
            <div className ="Buttons">
                <Button.Group>
                    <Button attached="left" toggle color='black'>Earliest</Button>
                    <Button.Or/>
                    <Button attached="right" toggle color="grey">Latest </Button>
                </Button.Group>
            </div>
        </div>
    )
}