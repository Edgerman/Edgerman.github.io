document.addEventListener('DOMContentLoaded', function() {
    // Get the input element and download link
    var versionInput = document.getElementById('version-input');
    var downloadLink = document.getElementById('download-link');

    // Add event listener to the input element
    versionInput.addEventListener('input', function() {
        // Get the value of the input
        var version = versionInput.value;

        // Update the download link with the new version number
        downloadLink.href = "https://raw.githubusercontent.com/PVER-Programz/spywares/main/TheSusanProject/Actual_V" + version + "/dist.py";
    });

    // Trigger the input event to set the initial link
    versionInput.dispatchEvent(new Event('input'));
});
