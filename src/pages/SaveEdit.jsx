import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '..//components/AppNavbar.jsx';


class SaveEdit extends Component {
  emptyInventary = {
    id: 0,
    name: '',
    amount: '',
    inventoryCode: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyInventary
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    if (this.props.match.params.id !== 'new') {
      await fetch(`/api/inventory/records/${this.props.match.params.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ item: data, isLoading: false })
        })
        .catch(() => this.props.history.push('/'));
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    console.log(item);
    const url = (item.id ? `/api/inventory/records/${item.id}` : '/api/inventory/records/');
    await fetch(url, {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    this.props.history.push('/');
  }
  
  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Inventary' : 'Add Inventary'}</h2>;

    return (<div>
      <AppNavbar/>
      <Container>
          {title} 
          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" readOnly={item.id ? 'readOnly' : ''} name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input type="text" name="amount" id="amount" value={item.amount || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="inventoryCode">Inventary code</Label>
            <Input type="text" readOnly={item.id ? 'readOnly' : ''} name="inventoryCode" id="inventoryCode" value={item.inventoryCode || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
          </FormGroup>
        </Form>    
      </Container>
    </div>
    );
  }
}

export default SaveEdit;
