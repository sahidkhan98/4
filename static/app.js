document.getElementById('singleTokenForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = document.getElementById('singleToken').value;

    fetch('/check_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `token=${token}`
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('singleTokenResult');
        if (data.status === "valid") {
            result.innerHTML = `<strong>Valid Token</strong><br>Account Name: ${data.data.name}<br>Profile Link: <a href="https://facebook.com/${data.data.id}" target="_blank">${data.data.id}</a>`;
        } else {
            result.innerHTML = '<strong>Invalid Token</strong>';
        }
    });
});

document.getElementById('multipleTokensForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tokens = document.getElementById('multipleTokens').value;

    fetch('/check_multiple_tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `tokens=${tokens}`
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('multipleTokensResult');
        result.innerHTML = '';
        data.forEach(item => {
            if (item.valid) {
                result.innerHTML += `<div><strong>Valid Token:</strong> ${item.token}<br>Account Name: ${item.details.name}<br>Profile Link: <a href="https://facebook.com/${item.details.id}" target="_blank">${item.details.id}</a></div><br>`;
            } else {
                result.innerHTML += `<div><strong>Invalid Token:</strong> ${item.token}</div><br>`;
            }
        });
    });
});
