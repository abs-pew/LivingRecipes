package de.neuefische.backend.model;

/**
 *  "message": {
 *  *         "role": "assistant",
 *  *         "content": "Hello! How can I assist you today?",
 *  *       }
 * @param message
 */
public record ResponseMessage(
        RequestMessage message ) {
}
