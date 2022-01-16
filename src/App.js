import React, { Component } from 'react';
import "./App.css";


class App extends Component {
  state = {
    randomQuestion: {}, 
    answer: '',
    question: '',
    value: 0,
    category: '', 
    buttonClasses: "questionButton ",
    questionClasses: "question hide",
    score: 0

  }

  handleSubmit = e => {
    e.preventDefault()
    // console.log('in random question');
    // console.log(e);

    this.setState({buttonClasses: 'questionButton'});
    this.setState({questionClasses: "question hide"});

    fetch('http://jservice.io/api/random') // returns a promise
      // response paremeter will represent the second promis that we get back from our fetch
      .then(response => response.json()) // returns second promise
      .then(data => this.setState({ randomQuestion: data }))
      .catch(error => console.error(error))

    
    // console.log(this.state.randomQuestion);
    this.setState({answer: this.state.randomQuestion?.[0].answer})
    this.setState({question: this.state.randomQuestion?.[0].question})
    this.setState({category: this.state.randomQuestion?.[0].category.title})
    this.setState({value: this.state.randomQuestion?.[0].value})

    // if (this.state.randomQuestion) {
    //   console.log(this.state.randomQuestion?.[0].answer)
    //   console.log(this.state.randomQuestion?.[0].question)
    //   console.log(this.state.randomQuestion?.[0].category.title)}
  }

  handleRevealQuestion = e => {
    e.preventDefault()
    // console.log('in reveal question');
    // console.log(e);

    this.setState({buttonClasses: this.state.buttonClasses+' hide'})
    this.setState({questionClasses: 'question'})

  }

  handleDecrement = e => {
    e.preventDefault()
    // console.log('in decrement')
    // console.log(this.state.score)
    this.setState({score: this.state.score-1})
  }

  handleIncrement = e => {
    e.preventDefault()
    // console.log('in increment')
    // console.log(this.state.score)
    this.setState({score: this.state.score+1})
  }

  handleReset = e => {
    e.preventDefault()
    // console.log('in reset')
    // console.log(this.state.score)
    this.setState({score: 0})
  }

  render() {
    // let buttonClasses = this.state.buttonClasses;
    // console.log(this.state.buttonClasses)

    return (
      <>
        <h1>Welcome to Jeopardy!</h1>

        <div>
          <h2>Score: {this.state.score}</h2>
          <div className='scoreButtons'>
            <button onClick={this.handleDecrement} className="scoreButton">Decrease</button>
            <button onClick={this.handleIncrement} className="scoreButton">Increase</button>
            <button onClick={this.handleReset} className="scoreButton">Reset</button>
          </div>
        </div>

        <h1>Let's Play!</h1>
        <button className="getQuestionButton" onClick={this.handleSubmit}>Get Question</button>

        <div>
        <h2>category is: {this.state.category}</h2>
        <h3>Points: {this.state.value}</h3>
        <h2>answer is: {this.state.answer}</h2>
        </div>

        <div>
          <button  onClick={this.handleRevealQuestion} className= {this.state.buttonClasses}>click to reveal question</button>
        {/* <h1>NEED A CLICK TO REVEAL QUESTION</h1> */}
        {/* on click to toggle seeing answer */}
        <p className={this.state.questionClasses}>question is: {this.state.question}</p>
        </div>
      </>
    );
  }
}

export default App;
