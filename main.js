var apiKey = "trnsl.1.1.20171031T094741Z.b8618875ef69a6bb.d4baa2b7efd346de3d5d51c9d805ab3cc18aada9";
var langDirection = "en-zh"

// Add bubble to the top of the page.
var bubble = document.createElement('div');
bubble.setAttribute('class', 'bubble');
document.body.appendChild(bubble);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    translateText(e.clientX-20, e.clientY+30, selection);
  }
}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubble.style.visibility = 'hidden';
}, false);

function translateText(mouseX, mouseY, selection) {
  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "&text=" + selection + "&lang=" + langDirection
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        if (/^[a-z\d\-_\s]+$/i.test(data.text[0])) {
          renderBubble(mouseX, mouseY, "Translation not found.");
        } else {
          renderBubble(mouseX, mouseY, data.text[0]);
        }
    })
    .catch(function(err) {
        console.error('An error ocurred', err);
    });
}

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  bubble.innerHTML = selection;
  bubble.style.top = mouseY + 'px';
  bubble.style.left = mouseX + 'px';
  bubble.style.visibility = 'visible';
}
