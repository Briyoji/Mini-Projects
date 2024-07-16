import "./App.css" 
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import NewsContainer from './Components/NewsContainer'

import { Routes, Route } from 'react-router-dom'
// import { NavLink, Link } from 'react-router-dom'


export default class App extends Component {
  // 4960c192a27040afa56db528508fbf04
  state = {
    progress: 0
  };

  
  apiKey = process.env.NEWS_API_KEY;
  
  categories = ['business','entertainment','general','health','science','sports','technology'];
  
  setProgress = (percent) => {
    this.setState({progress: percent});
  }

  render() {
    return (
      <>
        <Navbar loaderProgress={this.state.progress} categories={this.categories} />
           
        <Routes>
        <Route path="/" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} pageSize={10} category={"general"}/>} />
        {
          this.categories.map((category) => {
            return(<Route exact key={category} path={`/${category}`} element={<NewsContainer key={category} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={15} category={category}/>} />)
          })
        }
        </Routes>
      </>
    )
  }
}
