

library(httr)
library(jsonlite)
library(uuid)

# Set your variables
make_todoist_task <- function(content, due_string, priority, label) {
  
  project_id <- "2329275505"
  api_url = "https://api.todoist.com/rest/v2/tasks"
  auth_token <- readr::read_lines("/srv/linuxRstuff/todoist_key.txt")
  
  # Generate a UUID
  request_id <- UUIDgenerate()
  
  # Create the data payload
  data_payload <- toJSON(list(
    content = content,
    project_id = project_id,
    due_string = due_string,
    priority = priority,
    labels = list(label)
    ), auto_unbox = TRUE)
  
  # Make the POST request
  response <- POST(
    url = api_url,
    body = data_payload,
    add_headers(
      `Content-Type` = "application/json",
      `X-Request-Id` = request_id,
      `Authorization` = paste("Bearer", auth_token)
    )
  )
  
  response %>% content
  
  return(response)
}
