'use strict';

const { Octokit } = require("@octokit/rest");
const {exec} = require('child_process');

const token = process.env.GITHUB_API_TOKEN;

const octokit = new Octokit({
  auth: token
});

octokit.paginate('GET /gists').then(response => {
  for (let i=0; i < response.length; i++) {
    const gistId = response[i].id;
    const gistUrl = `git@gist.github.com:${gistId}.git`;

    exec(`git clone ${gistUrl}`);
  }
});
