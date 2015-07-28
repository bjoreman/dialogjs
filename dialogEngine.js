/*global Dialog*/
document.addEventListener('DOMContentLoaded', function () {
  var currentNode = Dialog.getNode('0');
  var container = document.getElementById('dialogContainer');
  var displayDialog = function (dialogNode) {
    var interactive = (dialogNode.type === 'interactive');
    var lines = document.createElement(interactive ? 'ol' : 'div');
    if (dialogNode && dialogNode.lines) {
      dialogNode.lines.forEach(function (line) {
        var newLine = document.createElement(interactive ? 'li' : 'div');
        newLine.innerHTML = line.text;
        newLine.addEventListener('click', function () {
          displayDialog(dialogNode.next(line.id));
        });
        if (line.url) {
          var link = document.createElement('a');
          link.href = line.url;
          link.innerHTML = line.url;
          newLine.appendChild(document.createElement('br'));
          newLine.appendChild(link);
        }
        lines.appendChild(newLine);
      });
    }
    container.innerHTML = '';
    container.appendChild(lines);
  };
  displayDialog(currentNode);
});