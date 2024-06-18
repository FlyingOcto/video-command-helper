document.addEventListener('DOMContentLoaded', function () {
    // Set up the initial open tab and add event listeners
    document.getElementsByClassName('tablinks')[0].click(); // Automatically open the first tab

    // Event listener for the yt-dlp command generation button
    document.getElementById('SubmitButton').addEventListener('click', function () {
        const link = document.getElementById('link').value;
        /*
        let pathInput = document.getElementById('path').value.trim();
        const path = pathInput ? `-P "${pathInput}"` : '';
        */
        const formats = document.getElementsByName('format');
        let selectedFormat = '';
        for (const format of formats) {
            if (format.checked) {
                switch (format.value) {
                    case 'mp4':
                        selectedFormat = "-f mp4";
                        break;
                    case 'mp3':
                        selectedFormat = "-x --audio-format mp3";
                        break;
                    case 'original_audio':
                        selectedFormat = "-x";
                        break;
                    default:
                        selectedFormat = ''; // Keep as empty string for "Original"
                }
                break;
            }
        }

        let duration = '';
        const duration1 = document.getElementById('duration1').value.trim();
        const duration2 = document.getElementById('duration2').value.trim();

        if (duration1 && duration2) {
            duration = `--download-sections "*${duration1}-${duration2}" --force-keyframes-at-cuts`;
        } else if (duration1) {
            duration = `--download-sections "*${duration1}-inf" --force-keyframes-at-cuts`;
        } else if (duration2) {
            duration = `--download-sections "*00:00-${duration2}" --force-keyframes-at-cuts`;
        }

        let SubOption = document.getElementById("subtitle").value;
        let Subs = ""
        if (SubOption) {
            Subs = `--write-auto-sub --sub-lang "${SubOption}" `;
        }

        const IgnoreErrors = document.getElementById('IgnoreErrors').checked ? '-i' : '';
        const NoDownload = document.getElementById('NoDownload').checked ? '--skip-download' : '';
        const ShowSub = document.getElementById('ShowSub').checked ? '--list-subs' : '';
        const ShowFormat = document.getElementById('ShowFormat').checked ? '-F' : '';
        const commandString = `yt-dlp ${IgnoreErrors} ${NoDownload} ${ShowSub} ${ShowFormat} ${selectedFormat} ${Subs} ${duration} "${link}" -o %(title)s.%(ext)s`;
        /* const commandString = `yt-dlp ${IgnoreErrors}${path} ${selectedFormat} ${duration} "${link}" -o %(title)s.%(ext)s`;*/
        document.getElementById('output').innerText = 'Command: ' + commandString;
    });

    // Event listener for the copy to clipboard button
    document.getElementById('copyButton').addEventListener('click', function () {
        const outputText = document.getElementById('output').textContent.replace('Command: ', '');
        navigator.clipboard.writeText(outputText).then(() => {
            const copyIndicator = document.getElementById('copyIndicator');
            copyIndicator.style.display = 'inline'; // Show the copy indicator

            setTimeout(() => {
                copyIndicator.style.display = 'none'; // Hide the indicator after 5 seconds
            }, 5000);
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    });
});

// Function to manage tab switching
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
