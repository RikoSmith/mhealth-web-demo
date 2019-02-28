import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
var base64 = require("file-base64");

const instance = axios.create({
  baseURL: "http://159.89.13.182:5000"
});

class App extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    token: "",
    color: "#ffffff",
    result: "..."
  };

  componentDidMount() {
    const code2 = btoa("rikosmith:asdasd");
    console.log(code2);
    instance
      .post(
        "/login",
        {},
        {
          headers: {
            Authorization: "Basic " + code2,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(response => {
        console.log("token " + response.data.token);
        this.setState({ token: response.data.token });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleselectedFile = event => {
    console.log(event.target.files[0]);
    console.log(event.target.files[0].toString());
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  handleUpload = e => {
    e.preventDefault();
    this.setState({
      result: "Hacking Google's voice recognisition systems...",
      color: "#FFEA3C"
    });
    const f = new FormData();
    f.append("lol", "asdasd");
    f.append("audio", this.state.selectedFile);
    console.log(f);
    console.log("MY TOKEN: " + this.state.token);
    instance
      .post("/test_web", f, {
        headers: {
          "x-access-token": this.state.token
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.new_mood === "not_stressed") {
          this.setState({
            result: "Not stressed, you're okay :)",
            color: "#9EFF85"
          });
        } else {
          this.setState({
            result: "Stressed, you need some help",
            color: "#FB4242"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>Choose Audiofile:</h2>
          <form>
            <label>
              <input
                type="file"
                name="name"
                onChange={this.handleselectedFile}
              />
            </label>
            <br />
            <br />
            <button onClick={this.handleUpload}>Upload</button>
          </form>
          <br />
          <br />
          <br />
          <h1 style={{ color: this.state.color }}>{this.state.result}</h1>
        </div>
      </div>
    );
  }
}

export default App;
