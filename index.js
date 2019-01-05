function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepositories);
    req.open('GET',
    'https://api.github.com/users/octocat/repos');
    req.send();
}

function showRepositories(){
    res = JSON.parse(this.responseText);
    repoList = `<ul>${res.map(r => 
        '<li>' + r.name + " - " + '<a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'
        ).join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            showCommits(req);
        }
    }
    req.open('GET', `https://api.github.com/repos/octocat/${name}/commits`);
    req.send();
}

function showCommits(req){
    const commits = JSON.parse(req.responseText);
    const commitsList = `<ul>${commits.map(
        commit => {
            if(commit.author){
                return '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>'
            }
        }).join('')}</ul>`;
    if(commitsList){
        document.getElementById('commits').innerHTML = commitsList;
    }
}   