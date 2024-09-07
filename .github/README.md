[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)
[![Continuous integration](https://github.com/nandordudas/physics/actions/workflows/ci.yml/badge.svg)](https://github.com/nandordudas/physics/actions/workflows/ci.yml)

# Physics

> :construction: work in progress

> [!TIP]
> Command for Fetching GitHub Pull Requests
>
> ```bash
> git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pull_requests/*"
> ```
>
> ### Explanation of the Command
>
> - **`git config --add remote.origin.fetch`**: Adds a new fetch refspec to the existing configuration for the remote named `origin`.
> - **`+refs/pull/*/head:refs/remotes/origin/pull_requests/*`**:
>   - **`+`**: Ensures that the refspec is updated even if it is a non-fast-forward update.
>   - **`refs/pull/*/head`**: Refers to all pull request branches on the GitHub repository (each pull request is stored in the `refs/pull` namespace).
>   - **`refs/remotes/origin/pull_requests/*`**: Tells Git to store the fetched pull request branches in the `refs/remotes/origin/pull_requests/` namespace locally.
