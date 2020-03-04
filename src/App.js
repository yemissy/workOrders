import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Import Components
import  Homepage  from './components/Home/HomePage';
import  SearchBar from './components/Search/searchBar';
import Data from './components/Data/Data';

const BASE_URL = "https://www.hatchways.io/api/assessment"
const WORKER_URL = "https://www.hatchways.io/api/assessment/workers"

const AVATAR_URL =  "https://api.unsplash.com/collections/9622127/photos?client_id=c80e91a61ca21927bb319d90e5e6c422641af5bd4a6f3fa66a17efacad6e0684"

let workersData = []
let workersIds = []
let ordersData;
let avatar;
let potentialMatches;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      workers:{
        id: "",
        name: "",
        companyName: "",
        email: "",
        image: "",
        work_orders: [],
        img_id: ""
      },
      search:{
        input: '',
        searchResults: [
          {
            title: "",
            key: "",
            image: ""
          }
        ],
        loading: false
      }
    }
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
    return avatar
  }
  
  async componentDidMount(){
    await this.getWorkers()
    await this.getAvatar()
    this.addStateData()
    localStorage.setItem('avatar', JSON.stringify(avatar))
    localStorage.setItem('ordersData', JSON.stringify(ordersData))
  }

  //write a function to update state and call that function in component did mount

  addStateData = () => {
      this.setState({
        workers:Data[0].map((worker, index )  => (
          {
            id: worker.id,
            name: worker.name,
            companyName: worker.companyName,
            email: worker.email,
            image: Data[1],
            work_orders: Data[2].filter(order => order.workerId === worker.id),
          }
        ))
      })
  }

  handleInputChange = (e) => {
    const {value} = e.target
    let regexp = new RegExp((value), "i") //convert value to reg expression pattern for string matching
    let matches = potentialMatches.filter(worker => worker.name.match(regexp))
    this.setState({
      search:{
        input: value,
        searchResults: matches.map((match, index )=> ({
          title: match.name,
          key: match.id,
          image:match.image[potentialMatches.indexOf(match)].urls.small
        }))
      }
    })
  }

  //Recieve uniquely filtered matches
  recieveMatches = (data) => {
    potentialMatches = data
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p id="welcome">
           Work Order App
          </p>
          <SearchBar 
          handleChange={this.handleInputChange}
          value={this.state.search.input}
          Searchresults={this.state.search.searchResults}
          loading={this.state.search.loading}/>
          <Homepage 
            workers = {this.state.workers}
            searchState={this.state.search}
            handleChange1 = {this.recieveMatches}
          />
        </header>
      </div>
    );
  }
}

export default App;
