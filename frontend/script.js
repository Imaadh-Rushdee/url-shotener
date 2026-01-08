document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('short_btn').addEventListener('click', function(event) {
  event.preventDefault();
    const shortUrl = document.getElementById("shortUrl").value;
    fetch('http://localhost:8000/url/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: shortUrl }),
    })
    .then(response => response.json())
    .then(data => {
        let parsedData = JSON.parse(data);
        document.getElementById("result").innerHTML = parsedData["shorten_url"];
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('get_btn').addEventListener('click', function(event) {
    event.preventDefault();

    const shortUrl = document.getElementById("getUrl").value;
    const encodedShortUrl = encodeURIComponent(shortUrl);
    const url = `http://localhost:8000/url/open?short_url=${encodedShortUrl}`;

    fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())  // parse JSON to object
    .then(data => {
        let parsedData = JSON.parse(data);
        if (parsedData && parsedData.original_url) {
            window.open(parsedData.original_url, '_blank');  // open the original URL
        } else {
            console.error('No original_url found in response:', parsedData);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  });
});
