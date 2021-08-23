import React, {Component} from "react";
import styled from "styled-components";



const api = axios.create({
  baseURL : `http://localhost:3000/`
})


class App extends Component {

  constructor() {
    super();
    api.get('/').then(res => {
      console.log(res.data) 
    })
  }
  render()
  return(
  )
}




export default App;
