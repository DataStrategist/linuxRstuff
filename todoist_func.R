

library(httr)
library(jsonlite)
library(uuid)

# Set your variables
make_todoist_task <- function(
    api_url = "https://api.to,doist.com/rest/v2/tasks",
    content = "kk",
    due_string = "today",
    priority = 1,
    label = "U.I") {
  
project_id <- "2329275505"
  auth_token <- readr::read_lines("/srv/linuxRstuff/todoist_key.txt")
  
  # Generate a UUID
  request_id <- UUIDgenerate()
  
  # Create the data payload
  data_payload <- toJSON(list(content = content, 
                              project_id = project_id,
                              due_string = due_string,
                              priority = priority,
                              label = label), auto_unbox = TRUE)
  
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
}
