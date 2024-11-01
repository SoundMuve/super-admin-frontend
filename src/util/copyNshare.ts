function shareText(text: string) {
    if (navigator.share) {
        navigator.share({
            text: text
        })
        .then(() => {
            console.log('Text shared successfully!');
        })
        .catch((error) => {
            console.error('Error sharing text:', error);
        });
    } else {
        // copyToClipboard(text);
        console.log('Web Share API is not supported in this browser.');
    }
}
  

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard!');
    })
    .catch((error) => {
        console.error('Error copying text:', error);
    });
}
  