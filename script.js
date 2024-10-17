let likeCount = 100;
let dislikeCount = 20;
let comments = [];

const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCountSpan = document.getElementById('likeCount');
const dislikeCountSpan = document.getElementById('dislikeCount');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

// Load saved state from cookies
window.onload = function() {
    likeCount = parseInt(getCookie("likeCount")) || 100;
    dislikeCount = parseInt(getCookie("dislikeCount")) || 20;
    comments = JSON.parse(getCookie("comments") || "[]");

    updateUI();
}

// Like button handler
likeBtn.addEventListener('click', function() {
    likeCount++;
    setCookie("likeCount", likeCount, 30);
    updateUI();
});

// Dislike button handler
dislikeBtn.addEventListener('click', function() {
    dislikeCount++;
    setCookie("dislikeCount", dislikeCount, 30);
    updateUI();
});

// Submit comment handler
submitBtn.addEventListener('click', function() {
    const commentText = commentInput.value.trim();
    if (commentText) {
        comments.push(commentText);
        setCookie("comments", JSON.stringify(comments), 30);
        updateUI();
    }
    commentInput.value = '';
});

// Reset handler
resetBtn.addEventListener('click', function() {
    likeCount = 100;
    dislikeCount = 20;
    comments = [];
    deleteCookie("likeCount");
    deleteCookie("dislikeCount");
    deleteCookie("comments");
    updateUI();
});

// Update UI function
function updateUI() {
    likeCountSpan.innerText = likeCount;
    dislikeCountSpan.innerText = dislikeCount;
    
    // Display comments
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.textContent = comment;
        commentList.appendChild(commentDiv);
    });
}

// Cookie functions
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
