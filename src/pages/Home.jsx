import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table  } from 'reactstrap';
import AppNavbar from '..//components/AppNavbar.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          groups: [], 
          isLoading: true
        };
        this.remove = this.remove.bind(this);
      }

      async componentDidMount() {
        this.setState({ isLoading: true });

        await fetch('api/inventory/records')
            .then(response => response.json())
            .then(data => this.setState({ groups: data._embedded.inventoryList, isLoading: false }))
            .catch(() => this.props.history.push('/'));
    }

    async remove(id) {
       await fetch(`/api/inventory/records/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
          this.setState({groups: updatedGroups});
        });
      }
    
    render() {
        const { groups, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = groups.map(group => {
            return <tr key={group.id}>
              <td style={{whiteSpace: 'nowrap'}}>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.amount}</td>
              <td>{group.inventoryCode}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" tag={Link} to={`/inventoryadd/${group.id}`} formMethod="GET">Edit</Button>
                  <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          });

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/inventoryadd/new" formMethod="GET">Add Inventory</Button>
                    </div>
                    <h3>Exercise Inventary</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="10%">Item ID</th>
                                <th width="20%">Name</th>
                                <th width="10%">Amount</th>
                                <th width="10%">Inventory Code</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Home;