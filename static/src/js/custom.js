// your-script.js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set A4 size dimensions (in pixels)
var a4Width = 794;
var a4Height = 1123;

// Set initial canvas dimensions to A4 size
canvas.width = a4Width;
canvas.height = a4Height;

var backgroundImage = new Image();
var dragging = false;
var dragIndex;
var offsetX, offsetY;

var cards = [
    // Default cards (white background with no text)
    // { x: 50, y: 50, width: 200, height: 150, fill: "white", text: "" },
    // { x: 300, y: 50, width: 200, height: 150, fill: "white", text: "" }
    // Add more cards or modify their positions and sizes as needed
];

function setBackgroundImage() {
    var imageInput = document.getElementById("image-input");
    var file = imageInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        backgroundImage.onload = function () {
            // Resize the image to fit the canvas
            var scale = Math.min(a4Width / backgroundImage.width, a4Height / backgroundImage.height);
            var scaledWidth = backgroundImage.width * scale;
            var scaledHeight = backgroundImage.height * scale;

            // Calculate center position to draw the image
            var centerX = (canvas.width - scaledWidth) / 2;
            var centerY = (canvas.height - scaledHeight) / 2;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the resized image as the canvas background
            ctx.drawImage(backgroundImage, centerX, centerY, scaledWidth, scaledHeight);

            // Draw the cards on top of the image
            drawCards();
        };
        backgroundImage.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function drawCard(x, y, width, height, fill, text) {
    // Draw the card shape on the canvas
    var borderRadius = 10;
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();

    // Add text inside the card
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    var lines = text.split("\n");
    var lineHeight = 20;
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + width / 2, y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight);
    }
}

function drawCards() {
    // Draw each card in the cards[] array
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        drawCard(card.x, card.y, card.width, card.height, card.fill, card.text);
    }
}
// your-script.js
// ... (previous code)

function updateCard() {
    // Update the text on the first card with the input values
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var address = document.getElementById("address").value;
    var state = document.getElementById("state").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var email = document.getElementById("email").value;

    // Create a new card object with the input data
    var newCard = {
        x: 50, // Set the initial position for the new card
        y: 250 * cards.length, // Adjust the y-coordinate based on the number of existing cards
        width: 200,
        height: 150,
        fill: "white",
        text:
            "First Name: " + firstName + "\n" +
            "Last Name: " + lastName + "\n" +
            "Address: " + address + "\n" +
            "State: " + state + "\n" +
            "City: " + city + "\n" +
            "Zip: " + zip + "\n" +
            "Email: " + email
    };

    // Add the new card object to the cards array
    cards.push(newCard);

    // Redraw the canvas with updated cards
    drawCards();
}

// ... (remaining code)

 document.addEventListener("DOMContentLoaded", function () {
    function downloadPDF() {
    // Create a new jsPDF instance
    var pdf = new jsPDF("p", "px", "a4");

    // Get the HTML content of the page
    var htmlContent = document.getElementById("page-content");

    // Options for jsPDF to set the page height and width
    var options = {
        html2canvas: { scale: 2 },
        background: '#fff'
    };

    // Use html2canvas to convert the HTML content to canvas
    html2canvas(htmlContent, options).then(function (canvas) {
        // Add the canvas image to the PDF
        pdf.addImage(canvas, "JPEG", 0, 0, canvas.width, canvas.height);

        // Download the PDF
        pdf.save("page.pdf");
    });
}
    });



function drawScene() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image as the canvas background (if available)
    if (backgroundImage.width !== 0 && backgroundImage.height !== 0) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        // Draw the cards on top of the image
        drawCards();
    }
}

// Adjust mouse coordinates based on canvas position
function updateOffset() {
    var rect = canvas.getBoundingClientRect();
    offsetX = rect.left;
    offsetY = rect.top;
}

function handleMouseDown(e) {
    var mx = e.clientX - offsetX;
    var my = e.clientY - offsetY;

    for (var i = cards.length - 1; i >= 0; i--) {
        var card = cards[i];
        if (mx >= card.x && mx <= card.x + card.width && my >= card.y && my <= card.y + card.height) {
            dragging = true;
            dragIndex = i;
            break;
        }
    }
}

function handleMouseUp(e) {
    dragging = false;
}

function handleMouseMove(e) {
    if (!dragging) {
        return;
    }

    var mx = e.clientX - offsetX;
    var my = e.clientY - offsetY;

    var card = cards[dragIndex];
    card.x = mx - card.width / 2;
    card.y = my - card.height / 2;

    drawScene();
}

// Event listeners
canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    e.stopPropagation();
    updateOffset();
    handleMouseDown(e);
});
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", function () {
    updateOffset();
    drawScene();
});

// Call to draw the initial scene
drawScene();
