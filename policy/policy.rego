package main

# Deny if public access is enabled
deny[msg] {
    input.public == true
    msg := "Public access is not allowed"
}

# Deny if environment is not production-safe
deny[msg] {
    input.env != "prod"
    msg := "Deployment from dev environment is not allowed"
}