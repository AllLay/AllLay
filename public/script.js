document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    const formData = {
        name: name,
        email: email,
        message: message
    };
    
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('form-response').innerHTML = 'Message sent successfully!';
            document.getElementById('contact-form').reset();
            alert("Your message has been sent successfully!");
        } else {
            document.getElementById('form-response').innerHTML = 'Failed to send message. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('form-response').innerHTML = 'Error: ' + error.message;
    });
});
