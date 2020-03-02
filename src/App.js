import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Import Components
import  Homepage  from './components/Home/HomePage';
import  SearchBar from './components/Search/searchBar';
import Data from './components/Data/Data';

const BASE_URL = "https://www.hatchways.io/api/assessment"
const WORKER_URL = "https://www.hatchways.io/api/assessment/workers"
// const API_KEY=process.env.REACT_APP_API_KEY
const AVATAR_URL =  "https://api.unsplash.com/collections/9622127/photos?client_id=c80e91a61ca21927bb319d90e5e6c422641af5bd4a6f3fa66a17efacad6e0684"

let workersData = []
let workersIds = []
let ordersData;
let avatar;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      workers: [
        {
          id: "",
          name: "",
          companyName: "",
          email: "",
          image: [],
          work_orders: []
        },
        {
          actualImages: []
        }
      ]
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
      results: this.state.workers.filter(worker => worker.name === this.state.value)
    }))
    console.log(this.state.results)
  }

  async getOrders () {
    await axios.get(`${BASE_URL}/work_orders`)
    .then(response => {
      ordersData = response.data.orders
    })
    .catch(error => {
      return error
    })
    return ordersData 
  }


  async getIds (){
    let orders = await this.getOrders()
    for (let i in orders) {
      let id = orders[i].workerId;
      workersIds.push(id)
    }
    return workersIds
  }
  
  
  async getWorkers(id){ 
    let ids = await this.getIds()
    for (let i in ids){
      id = ids[i]
      await axios.get(`${WORKER_URL}/${id}`)
      .then(response => {
        workersData.push(response.data.worker)
        localStorage.setItem('workers', JSON.stringify(workersData))
      })
      .catch(error => {
        return error
      })
    }
  }

  async getAvatar(){
    await axios.get(`${AVATAR_URL}`)
    .then(response => {
      avatar = response.data
    }).catch(error => {
      return error
    })
    console.log(avatar)
    return avatar
  }
  
  async componentDidMount(){
    await this.getWorkers()
    await this.getAvatar()
    console.log(avatar)
    this.addStateData()
    localStorage.setItem('avatar', JSON.stringify(avatar))
    localStorage.setItem('ordersData', JSON.stringify(ordersData))
    console.log(Data[0])
  }

  //write a function to update state and call that function in component did mount

  addStateData = () => {
      this.setState({
        workers:[ Data[0].map((worker, i)  => (
          {
            id: worker.id,
            name: worker.name,
            companyName: worker.companyName,
            email: worker.email,
            image: Data[0][i].image = Data[1].map((img, index) => {return Data[1][index].urls.thumb}),
            work_orders: Data[2].filter(order => order.workerId === worker.id)
          }
        )),
        {
          actualImages: Data[1]
        },
        ]
      })
      console.log(this.state.workers[0][0].image)
  }


  render(){
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
            workers = {this.state.workers}
          />
        </header>
      </div>
    );
  }

}

export default App;
