import React, { Component } from 'react';
// import Card from '../common/Card';
// import Filter from '../common/Filter'

let git = [];
let gitDetail = [];

export class List extends Component {
  constructor() {
    super();
    this.state = {
      organization: null,
      filters: false,
      cheap: false,
      inexpensive: false,
      midrange: false,
      expensive: false
    }
  }

  componentDidMount() {

  }


  // fetch(`https://api.github.com/users/${searchCriteria}/repos`)
  // .then(res => res.json())
  // .then(foundResults => git.push(foundResults))
  // .then( () => console.log(git))
  // .then( () => {
  //   for (let i=0; i<git[0].length; i++) {
  //   gitDetail.push(git[0][i])
  //   }
  // })
  // .then( () => gitDetail.sort((a,b) => {
  //   return b.forks_count - a.forks_count
  // } ))
  // .then( () => console.log(gitDetail))


      //fetch all members
    // (`https://api.github.com/orgs/${searchCriteria}/members`)
    //fetch all external collaborators
    // (`https://api.github.com/orgs/${searchCriteria}/outside_collaborators`)
    // fetches all repos
    // fetch (`https://api.github.com/users/facebook/repos`)
    // fetch all contributors(`https://api.github.com/repos/facebook/Docusaurus/contributors`)

  convertToRepos(organization) {
    fetch(`https://api.github.com/users/${organization}/repos`)
      .then(res => res.json())
      .then(foundResults => git.push(foundResults))
      .then(() => {
        for (let i=0; i<git[0].length; i++) {
          gitDetail.push(git[0][i])
        }
      })
      .then(() => {

      })
      .then(() => console.log(gitDetail))
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

  render() {
    let organization = this.props.organization
    if (this.props.organization) {
      this.convertToRepos(this.props.organization)
    }
    return (
      <div className="container page" style={{width: '100vw', marginTop: '3em', flexDirection: 'column' }}>
        <div className="container" style={{ flexDirection: 'row' }}>
          {/* <Filter /> */}
          <div className="itemsContainer">
            <div className="allItemsContainer" >
              {
                !organization
                  ?
                 <h2> Loading... </h2>
                  :
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Repository Name</th>
                        <th><button onClick={() => this.sortByForks()}>Forks</button></th>
                        <th><button onClick={() => this.sortByStars()}>Stars</button></th>
                        <th>Contributors</th>
                        <th>Internal Contributors</th>
                        <th>External Contributors</th>
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
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
