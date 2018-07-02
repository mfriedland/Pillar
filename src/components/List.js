import React, { Component } from 'react';
/* eslint-disable*/
/* tslint-disable*/

let gitDetail = [];
let internalContributors = [];
let externalContributors = [];

export class List extends Component {
  constructor() {
    super();
    this.state = {
      organization: null,
      toggle: "Internal"
    }
  }

  componentDidMount() {
  }

  convertToRepos(organization) {
    fetch(`https://api.github.com/users/${organization}/repos`)
      .then(res => res.json())
      .then(foundResults => {
        for (let i=0; i<foundResults.length; i++) {
          gitDetail.push(foundResults[i])
        }
      })
  }

  findContributors(organization) {
    fetch(`https://api.github.com/orgs/${organization}/members`)
      .then(res => res.json())
      .then(results => {
        for (let i=0; i<results.length; i++) {
          internalContributors.push(results[i])
        }
      })
    fetch(`https://api.github.com/orgs/${organization}/outside_collaborators`)
    .then(res => res.json())
    .then(results => {
      for (let i=0; i<results.length; i++) {
        externalContributors.push(results[i])
      }
    })
    .then( ()=> console.log(externalContributors))
  }

  sortByForks() {
    gitDetail.sort((a,b) => {
      return b.forks_count - a.forks_count
    })
    this.setState(this.state.list)
  }

  sortByStars() {
    gitDetail.sort((a,b) => {
      return b.watchers_count - a.watchers_count
    })
    this.setState(this.state.list)
  }

  toggleContributor() {
    if (this.state.toggle === "External") {
      this.setState({toggle: "Internal"});
    } else {
      this.setState({toggle: "External"});
    }
  }

  render() {
    let organization = this.props.organization;
    let toggle = this.state.toggle;
    if (this.props.organization) {
      this.findContributors(this.props.organization)
      this.convertToRepos(this.props.organization)
    }

    return (
      <div className="container page" style={{width: '100%', marginTop: '40px', flexDirection: 'column' }}>
        <div className="container" style={{ flexDirection: 'row' }}>
          <div className="itemsContainer">
            <div className="allItemsContainer" >
              {
                !organization
                  ?
                 <h2> </h2>
                  :
                <div>
                  <h1>{organization}</h1>
                  <h2>Repositories</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th><button onClick={() => this.sortByForks()}>Forks</button></th>
                        <th><button onClick={() => this.sortByStars()}>Stars</button></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        gitDetail.map(detail =>  {
                          return (
                            <tr key={detail.id}>
                              <td> {detail.name} </td>
                              <td> {detail.forks_count} </td>
                              <td> {detail.watchers_count} </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                  <h2>Contributors</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th><button onClick={() => this.toggleContributor()}>{toggle}</button></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        toggle === "Internal" &&
                        internalContributors.map(contributor =>  {
                          return (
                            <tr key={[contributor.id,contributor.login]}>
                              <td> {contributor.login} </td>
                            </tr>
                          )
                        })
                      }
                      {
                        toggle === "External" &&
                        externalContributors.map(contributor =>  {
                          return (
                            <tr key={[contributor.login,contributor.id]}>
                              <td> {contributor.login} </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
