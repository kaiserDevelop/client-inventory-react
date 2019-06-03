import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '..//components/AppNavbar.jsx';

class GroupList extends Component {
  
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
          </div>
          <h3>My JUG Tour</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Location</th>
              <th>Events</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withCookies(withRouter(GroupList));