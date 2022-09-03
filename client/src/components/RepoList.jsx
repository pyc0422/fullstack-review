import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    These are top {props.repos.length} repos.
    <ul>
      {props.repos.map(repo => <RepoEntry repo={repo} key={repo.repoId}/>)}
    </ul>
  </div>
)

const RepoEntry = (props) => (
  <li>
    <a href={props.repo.url}><b>{props.repo.name}</b>  </a>
    <b> | User: {props.repo.username}  |  </b>
    <a style={{fontSize: '12px'}}>  Folks Counts: {props.repo.forks_count}</a>
    <div style={{fontSize: '12px'}}>{props.repo.description}</div>
  </li>
)


export default RepoList;