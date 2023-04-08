"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    const allThumbnails = document.querySelectorAll('a.card-link');
    const randomImageIndex = getRandomInt(0, allThumbnails.length);
    const randomImage = allThumbnails.item(randomImageIndex);
    const imageUrl = randomImage.href;
    console.log('allthumbnails', allThumbnails);
    //console.log('randomImage', randomImage)
    //console.log('imageUrl', imageUrl)
    const imageDescription = randomImage.querySelector('img').alt;
    //console.log('imageDescription', imageDescription)
    switchFullImage(imageUrl, imageDescription);
    const cardBody = randomImage.parentElement;
    cardBody.classList.add('bg-dark', 'text-white');
    //console.log('cardbody',cardBody)
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    const allThumbnails = document.querySelectorAll('a.card-link');
    for (const thumbnail of allThumbnails) {
        //console.log(thumbnail)
        thumbnail.onclick = (event) => {
            event.preventDefault();
            const currentCard = thumbnail.parentElement;
            console.log('currentCard', currentCard);
            const oldCard = document.querySelector('.text-white');
            oldCard.classList.remove('bg-dark', 'text-white');
            currentCard.classList.add('bg-dark', 'text-white');
            const imageUrl = thumbnail.href;
            const imageDescription = thumbnail.querySelector('img').alt;
            switchFullImage(imageUrl, imageDescription);
            const imageKey = imageUrl;
            loadNotes(imageKey);

        };
    }
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {

    const notes = document.querySelector('#notes');
    console.log('notes', notes);
    notes.onblur = (event) => {
        console.log('onblur', notes.innerText);
        const fullImg = document.getElementsByTagName('img')[0];
        const notesKey = fullImg.src;
        const notesText = notes.innerText;
        if (notesText !== '') {
            localStorage.setItem(notesKey, notesText);
        } else {
            localStorage.removeItem(notesKey);
        }
    };
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    const fullImg = document.getElementsByTagName('img')[0];
    fullImg.src = imageUrl;
    fullImg.alt = imageDescription;
    const figCaption = document.querySelector('figcaption');
    figCaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    const notes = document.querySelector('#notes');
    const notesText = localStorage.getItem(key);
    console.log('notes', notes);
    console.log('notesText', notesText);
    if (notesText !== null) {
        notes.innerText = notesText;
    } else {
        notes.innerText = 'Enter your notes here!';
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
