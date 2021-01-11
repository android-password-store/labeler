import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    const labels = core.getInput("labels", { required: true }).split(",");

    const prNumber = getPrNumber();
    if (!prNumber) {
      console.log("Could not get pull request number from context, exiting");
      return;
    }

    const client = new github.GitHub(token);

    if (labels.length > 0) {
      await addLabels(client, prNumber, labels);
    }
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

async function addLabels(
  client: github.GitHub,
  prNumber: number,
  labels: string[]
) {
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels
  });
}

run();
