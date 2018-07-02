import React, {Component} from 'react'

export class Search extends Component {

  constructor() {
    super();
    this.state = {
      searchEntry: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    let searchCriteria = this.state.searchEntry;
    this.props.companyToRender(searchCriteria)
  }

  handleChange(event) {
    this.setState({
      searchEntry: event.target.value
    })
  }

   render() {
     return (
        <div className="container page" style={{width: '100vw', marginTop: '40px', flexDirection: 'column' }}>
          <form id = 'mainSearchForm' onSubmit={this.handleSubmit} >
            <input id= 'mainSearchInput' onChange={this.handleChange} placeholder="Search" />
            <button id="search-button"> Submit </button>
          </form>
        </div>
     )
    }
  }
