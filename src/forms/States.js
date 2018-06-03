import React, { Component } from 'react';
import { FormGroup,Label,Input } from 'reactstrap';
import axios from 'axios';

const config = { headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}, crossdomain : true};

class States extends Component {
    constructor (props) {
        super();
        this.state ={
            states : []
        }
        this.multiStates = this.multiStates.bind(this);
    }

    componentWillMount() {
        axios.get('https://quiz-service.herokuapp.com/quizes/states',config)
        .then(res => {
          this.setState({
            states: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        })

    }

    multiStates () {
        return (this.state.states.map((state,index) => <option key={state.code}>{state.name}</option>))
    }

    render() {
        return (
            <FormGroup>
                <Label for="multiStates">Selecione os estados</Label>
                <Input type="select" name="selectStates" id="multiStates" multiple>
                    {this.multiStates()}
                </Input>
            </FormGroup>
        );
    }
}

export default States;
