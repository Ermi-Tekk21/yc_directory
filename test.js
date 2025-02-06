const users = [
    {
        id: 1,
        name: "ermias",
        repos: [
            {
                id: 1,
                repoName: "RepoOne",
                commits: ["commitOne", "commitTwo", "commitThree"]
            }
        ]
    },
    {
        id: 2,
        name: "samuel",
        repos: [
            {
                id: 1,
                repoName: "RepoOne",
                commits: ["commitOne", "commitTwo", "commitThree"]
            },
            {
                id: 2,
                repoName: "RepoTwo",
                commits: ["commitOne", "commitTwo", "commitThree"]
            }
        ]
    },
    {
        id: 3,
        name: "abrsh",
        repos: [
            {
                id: 1,
                repoName: "RepoOne",
                commits: ["commitOne", "commitTwo", "commitThree"]
            }
        ]
    }]



getUsers(2, (selectedUser) => {
    console.log(`selected user: `, selectedUser.name);
    getRepo(1, selectedUser, (selectedRepo) => {
        console.log('selected repo: ', selectedRepo);
        getCommit("commitTwo", selectedRepo, (getCommit) => {
            console.log("selected Commit: ", getCommit);
        })
    })
})

function getUsers(id, getUser) {
    setTimeout(() => {
        const selectedUser = users.find((user) => (user.id === id))
        getUser(selectedUser)
    }, 2000)
}

function getRepo(repoId, selectedUser, getRepo) {
    setTimeout(() => {
        const selectedRepos = (selectedUser.repos)
        const selectedRepo = (selectedRepos).find((repo) => { repo.id === repoId })
        getRepo(selectedRepo)
    })
}


function getCommit(commitId, selectedRepo, getCommit) {
    setTimeout(() => {
        const selectedCommit = (selectedRepo.commits).find((commit) => { commit === commitId })
        getCommit(selectedCommit)
    })
}