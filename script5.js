//DOM Elements
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);
addBookmarkBtn.addEventListener("click", addBookmark);
function addBookmark(){
    const name = bookmarkNameInput.value;
    const url = bookmarkUrlInput.value;
    if(!name || !url){
        alert('Please enter both name and URL')
    } else {
        if(url.startsWith("http://")|| url.startsWith("https://")){
            addBookmarkToUI(name, url)
            saveBookmark(name,url);
            bookmarkNameInput.value = '';
            bookmarkUrlInput.value = '';
        } else {
            alert('Please enter a valid URL starting with http:// or https://');
        }
    }
}
function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem('bookmarks')
    return bookmarks ? JSON.parse(bookmarks) : []
}
function saveBookmark(name,url){
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({name,url});
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.forEach(bookmark => {addBookmarkToUI(bookmark.name, bookmark.url)});
}
function addBookmarkToUI(name, url){
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = url
    link.textContent = name;
    link.target = "_blank";
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener('click', function (){
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url)
    });

    li.appendChild(link);
    li.appendChild(removeBtn);
    bookmarkList.appendChild(li);
}
function removeBookmarkFromStorage(name, url){
    const bookmarks = getBookmarksFromStorage();
    const updatedBookmarks = bookmarks.filter((bookmark) => {return bookmark.name != name})
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
}