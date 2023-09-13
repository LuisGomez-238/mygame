// script.js
const character = document.getElementById('character');

let characterX = 0; // Initial character X position
let characterY = 0; // Initial character Y position
const characterSpeed = 5; // Character movement speed
let isJumping = false; // Flag to track if the character is jumping
let jumpHeight = 100; // Height of the jump (pixels)
let jumpDuration = 1000; // Duration of the jump (milliseconds)
let keys = {}; // Object to track pressed keys

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    moveCharacter();
});

document.addEventListener('keyup', (event) => {
    delete keys[event.key];
});

function moveCharacter() {
    if ('ArrowRight' in keys) {
        moveRight();
    }
    if ('ArrowLeft' in keys) {
        moveLeft();
    }
    if (' ' in keys && !isJumping) {
        jump();
    }
}

function moveRight() {
    characterX += characterSpeed;
    character.style.left = characterX + 'px';
}

function moveLeft() {
    characterX -= characterSpeed;
    character.style.left = characterX + 'px';
}

function jump() {
    if (!isJumping) {
        isJumping = true;

        const jumpStart = Date.now();
        const jumpInterval = setInterval(() => {
            const currentTime = Date.now() - jumpStart;
            if (currentTime < jumpDuration) {
                const progress = currentTime / jumpDuration;
                const jumpPosition = jumpHeight * Math.sin(progress * Math.PI);
                characterY = jumpPosition;
                character.style.bottom = characterY + 'px';
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                characterY = 0;
                character.style.bottom = characterY + 'px';
            }
        }, 10);
    }
}
