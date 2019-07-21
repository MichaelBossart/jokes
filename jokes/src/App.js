import React from "react";
import "./App.css";
import axios from "axios";
class Jokes extends React.Component {
  constructor() {
    super();
    this.state = {
      jokes: "",
      favJokes: []
    };
  }
  //make another statefull component that gets saved to state

  favoriteJoke = async () => {
    const response = await axios.post("http://localhost:4000/addNewFav", {
      jokes: this.state.jokes
    });

    this.setState({ favJokes: response.data });
  };

  nextJoke = async () => {
    const response = await axios.get("http://localhost:4000/joke");
    this.setState({
      jokes: response.data.joke// if responce.data is an object with an id and a joke then setstate with just responce.data
                              //  then update this.state.jokes in the return to be this.state.jokes.joke
    });
    console.log("response", response.data); //double check whats happening here
  };

  componentDidMount = async () => {
    const response = await axios.get("http://localhost:4000/joke");
    this.setState({
      jokes: response.data.joke //
    });
    console.log("response", response);
  };
  render() {
    return (
      <div className="joke">
        <h1>{this.state.jokes}</h1>

        <button onClick={this.nextJoke}>New joke</button>

        <button onClick={this.favoriteJoke}> Favorite joke </button>
        <FavJokes favoriteJokes={this.state.favJokes} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper />
      </header>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="Wrapper">
      <Header />
      <Body />
     
    </div>
  );
}

function Header() {
  return (
    <div className="Header">
      <div className="home">
        <p>Home</p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="Body">
      <Jokes />
    </div>
  );
}

function FavJokes(props) {
  // break .map return into a seprate component and render the compnent into .map
  const favoriteJokes = props.favoriteJokes.map(joke => {
    return <div className='styleJokes'>{joke}
    <button>Delete Joke</button>  
    </div>; //style joke here
    //get delete to work 
  });
  return (
    <div className="FavJokes">
      {favoriteJokes}
    </div>
  );
}

export default App;
