// Extract alphanumeric characters
function extractAlnum(string) {
    return string.replace(/[^a-zA-Z0-9_]/g, '');
}

// Function to send question to NGL API
async function sendQuestion(receiver, question, sender) {
    const url = "https://ngl.link/api/submit";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    const data = new URLSearchParams({
        username: receiver,
        question: question,
        deviceId: sender
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: data
        });

        // Check the HTTP response status
        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
            return `HTTP error! Status: ${response.status}`;
        }

        // Get the response as text for debugging purposes
        const textResponse = await response.text();
        console.log('Raw response text:', textResponse);

        try {
            // Attempt to parse the text as JSON
            const json = JSON.parse(textResponse);
            console.log('Parsed JSON:', json);

            // Check for questionId in the parsed JSON
            if (json.questionId) {
                return "Message Sent!";
            } else {
                return "User Blocked or Invalid ID!";
            }
        } catch (e) {
            // If JSON parsing fails, return raw text
            console.log('Failed to parse JSON. Returning raw response:', textResponse);
            return `Failed to parse JSON. Raw response: ${textResponse}`;
        }

    } catch (error) {
        // Handle actual network errors here
        console.log('Network error occurred:', error);
        return `Network error occurred: ${error.message}`;
    }
}

// Handle form submission
document.getElementById('nglForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const receiver = document.getElementById('receiver').value;
    const question = document.getElementById('question').value;
    let sender = document.getElementById('sender').value;

    sender = extractAlnum(sender);  // Clean sender ID
    
    const result = await sendQuestion(receiver, question, sender);
    
    // Output the result to the user
    document.getElementById('response').innerText = result;

    // Log the final result to the console
    console.log('Final result:', result);
});