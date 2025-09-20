package de.neuefische.backend.model;

//*{
/// /        "role": "developer",
/// /        "content": "You are a helpful assistant."
/// /      }

public record RequestMessage(
        String role,
        String content ) {
}
