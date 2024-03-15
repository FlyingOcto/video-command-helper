document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        const link = document.getElementById('link').value;

        let pathInput = document.getElementById('path').value.trim();
        const path = pathInput ? `-P "${pathInput}"` : '';

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

        const ignoreErrors = document.getElementById('ignoreErrors').checked ? '-i ' : '';
        const commandString = `yt-dlp ${link} ${ignoreErrors} ${path} ${selectedFormat}`;
        document.getElementById('output').innerText = 'Command: ' + commandString;
    });


    document.getElementById('copyButton').addEventListener('click', function() {
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
