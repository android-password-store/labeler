import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    const labelsToAdd = core.getInput("labels-to-add", { required: false })?.split(",") ?? [];
    const labelsToRemove = core.getInput("labels-to-remove", { required: false })?.split(",") ?? [];

    if (labelsToAdd.length == 0 && labelsToRemove.length == 0) {
      const errMsg = 'No labels were provided for addition or removal';
      core.error(errMsg);
      core.setFailed(errMsg);
      return;
    }

    const prNumber = getPrNumber();
    if (!prNumber) {
      console.log("Could not get pull request number from context, exiting");
      return;
    }

    const client = new github.GitHub(token);

    if (labelsToAdd.length > 0) {
      await addLabels(client, prNumber, labelsToAdd);
    }
    if (labelsToRemove.length > 0) {
      await removeLabels(client, prNumber, labelsToRemove)
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

async function removeLabels(
  client: github.GitHub,
  prNumber: number,
  labels: string[],
) {
  for (const label in labels) {
    await client.issues.removeLabel({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      name: label,
    });
  }
}

run();
