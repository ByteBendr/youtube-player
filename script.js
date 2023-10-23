let user;

function initApp() {
    firebase.auth().onAuthStateChanged(function(authUser) {
        if (authUser) {
            user = authUser;
            document.getElementById('sign-in').style.display = 'none';
            document.getElementById('sign-out').style.display = 'block';
        } else {
            user = null;
            document.getElementById('sign-in').style.display = 'block';
            document.getElementById('sign-out').style.display = 'none';
        }
    });
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('Signed in as:', result.user.displayName);
        })
        .catch((error) => {
            console.error('Sign-in error:', error);
        });
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Signed out');
        })
        .catch((error) => {
            console.error('Sign-out error:', error);
        });
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (form submission)
        const searchQuery = this.value; // 'this' refers to the input element
        search();
    }
});

function search() {
    const searchQuery = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = '';

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=AIzaSyAQiuHBfFPDoldvTNHaH0-UZvf8Tgr410g`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnailUrl = item.snippet.thumbnails.medium.url; // Get medium-sized thumbnail

                resultsDiv.innerHTML += `
                    <div class="result-item">
                        <img src="${thumbnailUrl}" alt="${title}">
                        <h2>${title}</h2>
                        <button onclick="playVideo('${videoId}', '${title}')">Play</button>
                    </div>
                `;
            });
        });
}

function playVideo(videoId, title) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `
        <iframe width="800" height="450" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
    `;

    const titleText = document.getElementById('titleText');
    titleText.textContent = title;

    const videoTitleDiv = document.getElementById('videoTitle');
    videoTitleDiv.style.display = 'inline-block'; // Show the video title

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    var footer = document.getElementById("footer");
    if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
        footer.style.opacity = "1";
    } else {
        footer.style.opacity = "0";
    }
}

// END OF FILE


