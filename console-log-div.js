(function initConsoleLogDiv() {

  if (console.log.toDiv) {
    return;
  }

  function toString(x) {
    return typeof x === 'string' ? x : JSON.stringify(x);
  }

  var log = console.log.bind(console);
  var error = console.error.bind(console);

  var logTo = (function createLogDiv() {

    var div = document.createElement('div');
    div.id = 'console-log-div';
    div.classList.add('console-log-div');
    var style = div.style;
    style.width = '100%';
    style.minHeight = '200px';
    style.fontFamily = 'monospace';
    style.marginTop = '20px';
    style.whiteSpace = 'pre';
    style.border = '1px solid black';
    style.borderRadius = '5px';
    style.padding = '5px 10px';
    document.body.appendChild(div);

    return div;
  }());

  function printToDiv() {
    var msg = Array.prototype.slice.call(arguments, 0)
      .map(toString)
      .join(' ');
    var text = logTo.textContent;
    logTo.textContent = text + msg + '\n';
  }

  function logWithCopy() {
    log.apply(null, arguments);
    printToDiv.apply(null, arguments);
  }

  console.log = logWithCopy;
  console.log.toDiv = true;

  console.error = function errorWithCopy() {
    error.apply(null, arguments);
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('ERROR:');
    printToDiv.apply(null, args);
  };

}());
