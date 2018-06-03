import React, { Component } from 'react';
import { Form,FormGroup,Label,Input,Button } from 'reactstrap';
import axios from 'axios';
import States from './States';
import { Question } from '../domains/Question';
import { Alternative } from '../domains/Alternative';

const config = {	headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}, crossdomain : true};

class QuizForm extends Component {

    constructor(props) {
        super()
        this.state = {
            quizes : [],
            name : '',
            questions: []
        }
		this.setName = this.setName.bind(this);
		this.handleQuizSubmit = this.handleQuizSubmit.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.addAlternative = this.addAlternative.bind(this);
    }

    setName (e) {
        this.setState({
            name: e.target.value
        })
    }

    handleQuizSubmit(event) {
        event.preventDefault()
        this.onSubmit(event)
    }

    onSubmit(event) {
        axios.post('https://quiz-base-service.herokuapp.com/admin',{name:this.state.name},config)
        .then(res => {
          this.setState({
            quizes: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        })
    }

    addQuestion = (event) => {
        event.preventDefault();
        this.setState({questions : [...this.state.questions,new Question('',[])]})
    }

    addAlternative = (idx) => (event) => {
        event.preventDefault();
        let tempQuestions = this.state.questions;
        const currentQuestion = this.state.questions
            .filter((question,sidx) => sidx === idx)[0];
        currentQuestion.alternatives = [...currentQuestion.alternatives, new Alternative(false,'')];
        tempQuestions[idx] = currentQuestion;
        this.setState({
            questions : tempQuestions
        })
    }

  setQuestionName = (idx) => (evt) => {
    const newQuestions = this.state.questions.map((question, sidx) => {
      if (idx !== sidx) return question;
      return { ...question, name: evt.target.value };
    });
    this.setState({ questions: newQuestions });
  }

  setAlternativeName = (idx,idxAlt) => (evt) => {
    let tempQuestions = this.state.questions;
    const modifiedAlternatives = tempQuestions
        .filter((question,sidx) => sidx === idx)[0]
        .alternatives.map((alternative,sidxAlt) => {
            if (sidxAlt !== idxAlt) return alternative;
            return {...tempQuestions[idx].alternatives,text: evt.target.value}
        });
    tempQuestions[idx].alternatives = modifiedAlternatives;
    this.setState({
        questions : tempQuestions
    })    
  }

    render () {
        return (
            <Form>
                <FormGroup onSubmit={this.handleQuizSubmit}>
                    <Label for="quizName">Nome do Quiz</Label>
                    <Input type="quizName" name="quizName" id="quizName" placeholder="Inclua o nome do Quiz" onChange={this.setName} value={this.state.name}/>
                    <States />
                    {this.state.questions.map((question,idx) =>
                        <FormGroup key={idx}>
                            <Label for="questionName">Nome da Questão</Label>
                            <Input type="questionName" name="questionName" id="questionName" 
                                placeholder="Inclua o nome da questão" 
                                onChange={this.setQuestionName(idx)} value={question.name}/>
                            {question.alternatives.map((alternative,idxAlt) =>
                                <FormGroup key={idxAlt}>
                                    <Label for="alternativeName">Nome da Alternativa</Label>
                                    <Input type="alternativeName" name="alternativeName" id="alternativeName" 
                                        placeholder="Inclua o nome da alternativa" 
                                        onChange={this.setAlternativeName(idx,idxAlt)} value={alternative.name}/>
                                </FormGroup>
                            )}
                            <Button onClick={this.addAlternative(idx)}>Adicionar Alternativa</Button>
                        </FormGroup>
                    )}
                    <Button onClick={this.addQuestion}>Adicionar Questão</Button>
                </FormGroup>
                <Button onClick={this.handleQuizSubmit}>Submit</Button>
            </Form>
        )
    }
}

export default QuizForm;
