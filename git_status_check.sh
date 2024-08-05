#!/bin/bash

# Function to check and print the status of a git repository
check_git_status() {
    local repo_path="$1"
    
    # Navigate to the repository
    cd "$repo_path" || return

    # Fetch the latest updates silently
    git fetch --quiet

    # Get the current branch name
    current_branch=$(git rev-parse --abbrev-ref HEAD)

    # Initialize status messages
    status_messages=()

    # Check for uncommitted changes
    if [[ -n $(git status --porcelain) ]]; then
        status_messages+=("Uncommitted changes")
    fi

    # Check if a pull is required
    if [[ -n $(git log HEAD..origin/"$current_branch" --oneline) ]]; then
        status_messages+=("Pull required")
    fi

    # Check if a push is required
    if [[ -n $(git log origin/"$current_branch"..HEAD --oneline) ]]; then
        status_messages+=("Push required")
    fi

    # Set branch name color based on whether it's the main branch
    if [[ "$current_branch" == "main" ]]; then
        branch_display="Branch: $current_branch"
    else
        branch_display="Branch: \e[38;5;214m$current_branch\e[0m"  # Purple for non-main branches
    fi

    # Print the status if there are any actions required
    if [[ ${#status_messages[@]} -gt 0 ]]; then
        echo -e "$repo_path - $branch_display, \e[31m${status_messages[*]}\e[0m"
    else
        echo -e "$repo_path - $branch_display"
    fi
    
    # Return to the original directory
    cd - > /dev/null || exit
}

# Export the function to be used by the find command
export -f check_git_status

# Find all git repositories and check their status
find . -type d -name ".git" -exec bash -c 'check_git_status "$(dirname "{}")"' \;

