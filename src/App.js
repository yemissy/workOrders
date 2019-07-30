import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Import Components
import  Homepage  from './components/Home/HomePage';
import  SearchBar from './components/Search/searchBar';

const BASE_URL = "https://www.hatchways.io/api/assessment"
const WORKER_URL = "https://www.hatchways.io/api/assessment/workers"


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      work_orders: [],
      workers: [],
      search: {
        text: '',
        isLoading: "false",
        results: []
      }
    }
  }

  handleInputChange = (e) => {
    const {value} = e.target
    this.setState( prevState => ({
      search: {
        ...prevState.search, 
        text: value
      }
    }))
    console.log(value)
  }

  handleResultSelect = (e) => {
    console.log(this.state.search.text)
    this.setState(prevState => ({
      results: this.state.workers.filter(worker => worker.name == this.state.value)
    }))
    console.log(this.state.results)
  }

  async getOrders () {
    await axios.get(`${BASE_URL}/work_orders`)
    .then(response => {
      let data = response.data.orders
      this.setState({work_orders:data});
      console.log(this.state.work_orders)
    })
    .catch(error => {
      console.log("there is an error")
      return error
    })

  }


  getIds = () => {
    let workersIds =[]
    for (let i in this.state.work_orders) {
      let id = this.state.work_orders[i].workerId;
      // console.log(`the worker id is ${id}`)
      workersIds.push(id)
    }
    console.log(workersIds)
    return workersIds
  }
  
  
  async getWorkers(id){ 
    let ids = this.getIds()
    let workers = [] 
    for (let i in ids){
      id = ids[i]
      await axios.get(`${WORKER_URL}/${id}`)
      .then(response => {
        workers.push(response.data.worker)
      })
      .catch(error => {
        console.log("there is an error")
        return error
      })
    }
    this.setState({ workers : workers})
    console.log(this.state.workers)
  }
  
  async componentDidMount(){
    await this.getOrders()
    await this.getWorkers()
  }

  render(){
    console.log(this.state.workers)
    return (
      <div className="App">
  
        <header className="App-header">
          <p id="welcome">
           Welcome to my Work Order App
          </p>
          <SearchBar 
          handleChange={this.handleInputChange}
          handleSelect={this.handleResultSelect}
          />
          <Homepage 
            orders = {this.state.work_orders} 
            workers = {this.state.workers}
          />
        </header>
      </div>
    );
  }

}

export default App;
