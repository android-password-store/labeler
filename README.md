# Pull Request Labeler
## Usage

### Adding review requested label when a PR is opened

```yaml
name: "Pull Request Labeler"
on:
  pull_request:
    types:
      - opened
      - review_requested
  pull_request_review:
    types:
      - dismissed

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
    - uses: android-password-store/labeler@main
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        labels-to-add: "S-waiting-on-review"
```

### Removing the review requested label when review is submitted

```yaml
name: "Pull Request Labeler"
on:
  pull_request_review:
    types:
      - submitted
  pull_request:
    types:
      - closed
      - review_request_removed

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
    - uses: android-password-store/labeler@main
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        labels-to-remove: "S-waiting-on-review"
```

_Note: This grants access to the `GITHUB_TOKEN` so the action can make calls to GitHub's rest API_

#### Inputs

Various inputs are defined in [`action.yml`](action.yml) to let you configure the labeler:

| Name | Description | Default |
| - | - | - |
| `repo-token` | Token to use to authorize label changes. Typically the GITHUB_TOKEN secret | N/A |
| `labels-to-add` | Comma separated list of labels to apply to the pull request | N/A |
| `labels-to-remove` | Comma separate list of labels to remove from the pull request | N/A |
