document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('short_btn').addEventListener('click', function(event) {
  event.preventDefault();
    const shortUrl = document.getElementById("shortUrl").value;
    const urlName = document.getElementById("shortUrlName").value;
    fetch('http://localhost:8000/url/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: shortUrl, name: urlName }),
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

deleteUrl = (urlId) => {
  fetch(`http://localhost:8000/url/delete/${urlId}`, {
      method: 'DELETE',
  }).then(response => {
      if (response.ok) {
          alert("URL deleted successfully.");
          location.reload(); // Refresh the page to update the URL list
      } else {
          alert("Failed to delete URL.");
      }
  }).catch(error => {
      console.error("Error deleting URL:", error);
  } );
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8000/url/', {
      method: 'GET',
  }).then(response => response.json())
    .then( data => {
        const tableBody = document.getElementById('urlTableBody');
      tableBody.innerHTML = ""; // clear old data (important)
        let parsedData = JSON.parse(data);
      parsedData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${item.name}</td>
        <td><a href="${item.original_url}" target="_blank">${item.original_url}</a></td>
        <td><a href="${item.original_url}" target="_blank">${item.shorten_url}</a></td>
        <td><button onclick="deleteUrl('${item.url_id}')">Delete</button></td>
        `;

        tableBody.appendChild(row); 
    });
    }).catch(error => {
      console.error("Error loading URLs:", error);
    });
});