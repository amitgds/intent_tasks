async function crack(type) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`index.php?action=crack_${type}`);
        const data = await response.json();

        if (data.status === 'success') {
            let html = '<table><tr><th>User ID</th><th>Password</th></tr>';
            for (const [userId, password] of Object.entries(data.data)) {
                html += `<tr><td>${userId}</td><td>${password}</td></tr>`;
            }
            html += '</table>';
            resultsDiv.innerHTML = html;
        } else {
            resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}