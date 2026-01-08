function shortUrl() {
    shortUrl = document.getElementById("shortUrl").value;
    fetch('http://localhost:8000/url/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: shortUrl
        })
    }).then(response => response.json()).then(data => {
        document.getElementById("result").innerHTML = "Shortened URL: " + data.short_url;
    }).catch((error) => {
        console.error('Error:', error);
    });
}