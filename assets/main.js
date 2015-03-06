"use strict";

(function() {
    function log() {
        console.log.apply(console, arguments);
    }

    function displayError(msg) {
        console.error(msg);
        alert(msg);
    }

    // listen on shift+tab
    function tabOverride() {
        var textarea = document.querySelector("textarea");
        if (textarea == null) { return }
        textarea.onkeydown = function (e) {
            if (e.shiftKey && e.keyCode === 9) {
                e.preventDefault();
                var text = textarea.value;
                var pos = textarea.selectionStart;
                textarea.value = text.substr(0, pos) + '    ' + text.substr(pos);
                // select nothing
                console.log(textarea.selectionStart, textarea.selectionEnd, textarea);
                textarea.selectionStart = pos + 4;
                textarea.selectionEnd = pos + 4;
            }
        }
    }

    // support DELETEing resources via data-method="DELETE"
    function supportDeleteLinks() {
        var deleteLinks = document.querySelectorAll("a[data-method=DELETE]");
        for (var i = 0; i < deleteLinks.length; i++) {
            (function(deleteLink) {
                deleteLink.addEventListener("click", function(ev) {
                    ev.preventDefault();

                    var xhr = new XMLHttpRequest();
                    xhr.open("DELETE", deleteLink.href);
                    xhr.onload = function(ev) {
                        if (xhr.status == 200) {
                            location.reload();
                        } else {
                            displayError("could not delete post");
                        }
                    }
                    xhr.send();
                });
            })(deleteLinks[i]);
        }
    }

    // render the markdown preview
    function renderPreview() {
        var textarea = document.getElementById("edit-content");
        var previewSelect = document.getElementById("preview-select");
        var preview = document.getElementById("preview-tab");
        if (previewSelect == null) { return; }

        previewSelect.addEventListener("click", function(ev) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/posts/preview');
            xhr.send(textarea.value);
            xhr.onload = function(ev) {
                if (xhr.status == 200) {
                    preview.innerHTML = xhr.responseText;
                } else {
                    console.error(xhr);
                }
            };
        });
    }

    tabOverride();
    supportDeleteLinks();
    renderPreview();
})();
