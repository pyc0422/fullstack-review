import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map(repo => <RepoEntry repo={repo} key={repo.repoId}/>)}
    </ul>
  </div>
)

const RepoEntry = (props) => (
  <li>
    <a href={props.repo.url}>{props.repo.name}</a>
    <a>  User: {props.repo.username}</a>
    <a>  Folks Counts: {props.repo.forks_count}</a>
    <div style={{fontSize: '16px'}}>{props.repo.description}</div>
  </li>
)


export default RepoList;