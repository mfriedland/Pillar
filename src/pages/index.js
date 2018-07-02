import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Search } from '../components/Search'
import { List } from '../components/List'

export class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      organization: null,
    }
    this.companyToRender = this.companyToRender.bind(this)
  }

  companyToRender(company) {
    this.setState({ organization: company})
  }

  render() {
    return (
      <div className="home">
        <Search companyToRender={this.companyToRender} />
        <List organization={this.state.organization} />
        {/* <Link to="/page-2/">Go to page 2</Link> */}
      </div>
    )
  }
}

export default IndexPage
