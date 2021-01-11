# Pull Request Labeler

Pull request labeler triages PRs based on the paths that are modified in the PR.

## Usage

### Create Workflow

Create a workflow (eg: `.github/workflows/labeler.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) to utilize the labeler action with content:

```
name: "Pull Request Labeler"
on:
- pull_request_target

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
    - uses: android-password-store/labeler@main
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        labels: "S-waiting-on-review"
```

_Note: This grants access to the `GITHUB_TOKEN` so the action can make calls to GitHub's rest API_

#### Inputs

Various inputs are defined in [`action.yml`](action.yml) to let you configure the labeler:

| Name | Description | Default |
| - | - | - |
| `repo-token` | Token to use to authorize label changes. Typically the GITHUB_TOKEN secret | N/A |
| `labels` | Comma separated list of labels to apply to the pull request | N/A |
