import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'


// Member Table Functionality
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//inline styles
const styles = {
    backgroundColor: '#white',
    padding: 20
}

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const rootStyles = {
  style: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
  }
}


const tableStyles = {
    minWidth: 450,
}

const tableColStyles = {
  padding: 2,
}

class CreateMember extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.handleMemberInputChange = this.handleMemberInputChange.bind(this)
    this.handleMemberRoleChange = this.handleMemberRoleChange.bind(this);
    this.handleMemberStatusChange = this.handleMemberStatusChange.bind(this);

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleCreateButton = this.handleCreateButton.bind(this)

    this.state = {
      dataKeyMemberKeys: null,
      foundationMembers: [],
      dataKeyMembersAttributes: [],
      dialogOpen: false,
      memberAddress: '',
      memberRole: 0,
      memberStatus: true,
      alertText: ''
    }

  }

  componentDidMount() {

    const dataKeyMemberKeys = this.contracts.ServiceRequest.methods.getFoundationMemberKeys.cacheCall();

    this.setState({dataKeyMemberKeys})
    this.setFoundationMembers(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyMemberKeys !== prevState.dataKeyMemberKeys) {
        this.setFoundationMembers(this.props.ServiceRequest)
    }
  }

  setFoundationMembers(contract) {
    if (contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys] !== undefined && this.state.dataKeyMemberKeys !== null) {

console.log("contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value - " + contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value);      
      this.setState({
        foundationMembers: contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value
      }, () => {
        console.log("this.state.foundationMembers.length - " + this.state.foundationMembers.length);
        var dataKeyMembersAttributes = []
        for(var i=0; i< this.state.foundationMembers.length; i++) {
          dataKeyMembersAttributes.push(this.contracts.ServiceRequest.methods.foundationMembers.cacheCall(this.state.foundationMembers[i]))
        }
        this.setState({dataKeyMembersAttributes});
      });


    }
  }

  handleMemberInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleMemberRoleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleMemberStatusChange(event) {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleCreateButton() {

    if(this.context.drizzle.web3.utils.isAddress(this.state.memberAddress) ) {

      const stackId = this.contracts.ServiceRequest.methods["addOrUpdateFoundationMembers"].cacheSend(this.state.memberAddress, this.state.memberRole, this.state.memberStatus, {from: this.props.accounts[0]})
      if (this.props.transactionStack[stackId]) {
        const txHash = this.props.trasnactionStack[stackId]
        console.log("txHash - " + txHash)
      }
    } else if (!this.context.drizzle.web3.utils.isAddress(this.state.memberAddress)) {
      this.setState({ alertText: `Oops! The member address isn't a correct ethereum address.`})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }

  }

  createRow(mem, index) {

    if (this.props.ServiceRequest.foundationMembers[mem] !== undefined && mem !== null) {

      var m = this.props.ServiceRequest.foundationMembers[mem].value;
      var a = this.state.foundationMembers[index];
      return (
          <TableRow key={a}>
            <TableCell style={tableColStyles} component="th" scope="row">{a}</TableCell>
            <TableCell style={tableColStyles} align="right">{m.role === "1" ? "Admin" : "Normal"}</TableCell>
            <TableCell style={tableColStyles} align="right">{m.status?'Active':'InActive'}</TableCell>
          </TableRow>
      );

    }
  }

  render() {
 
    return (
      <div className="admin-foundation-member-container">
        <Paper style={styles} elevation={0} className="singularity-content">
          <p>Add Foundation Member: </p>
          <form className="pure-form pure-form-stacked foundation-member-form">
            <div className="row">
              <div className="col">
                <label>Member address:</label>
                <input className="singularity-input" name="memberAddress" type="text" placeholder="Member address:" autoComplete='off' value={this.state.memberAddress} onChange={this.handleMemberInputChange} /> 
              </div>
            </div>
            <div className="row">
              <div className="col">              
                <label> Role: </label>
                <select name="memberRole" defaultValue="0" onChange={this.handleMemberRoleChange}>
                  <option value="1">Admin</option>
                  <option value="0">Normal</option>
                </select> 
              </div>
              <div className="col">         
                <label> Status: </label><div className="clearfix"></div>
                <input name="memberStatus" type="checkbox" checked={this.state.memberStatus} onChange={this.handleMemberStatusChange}/> 
              </div>        
            </div>
            <div className="row text-right">
              <div className="col">                               
                <Button className="singularity-button high-margin singularity-button-blue" type="Button" variant="contained" onClick={this.handleCreateButton}>Create</Button>                
              </div>
            </div>            
          </form>
      </Paper>

      <Paper styles={rootStyles} className="singularity-table">
        <Table style={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell style={tableColStyles}>Member</TableCell>
              <TableCell style={tableColStyles} align="right">Role</TableCell>
              <TableCell style={tableColStyles} align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dataKeyMembersAttributes.map((mem, index) =>  this.createRow(mem, index))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
        <p>{this.state.alertText}</p>
        <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
      </Dialog>

      </div>
    )
  }
}

CreateMember.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SingularityNetToken: state.contracts.SingularityNetToken,
    ServiceRequest: state.contracts.ServiceRequest,
    drizzleStatus: state.drizzleStatus,
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}
export default drizzleConnect(CreateMember, mapStateToProps)