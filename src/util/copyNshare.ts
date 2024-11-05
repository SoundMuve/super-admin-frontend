import { useSettingStore } from "@/state/settingStore";

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard!');

        useSettingStore.getState()._setToastNotification({
            display: true,
            status: "info",
            message: "Copied to clipboard!"
        });
    })
    .catch((error) => {
        console.error('Error copying text:', error);
    });
}
  
export function shareText(text: string) {
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
        copyToClipboard(text);
        console.log('Web Share API is not supported in this browser.');
    }
}


export function forceDownload(url: string, filename: string) {
    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
  
    // Set the download attribute with the complete filename
    a.download = filename;
  
    // Append the anchor to the body
    document.body.appendChild(a);
  
    // Trigger the click on the anchor
    a.click();
  
    // Remove the anchor from the body
    a.remove();
}

// Current blob size limit is around 500MB for browsers
export function downloadFile(url: string, filename: string) {
    // Extract the file extension from the URL
    const newUrl: any = url;
    const extension = newUrl.split('.').pop().split('?')[0];
    if (!extension) {
        console.log("unable to get file extension");
        return;
    }
    // console.log(extension);
    
    // Add the extension to the filename if it doesn't already have it
    const completeFilename = filename.includes('.') ? filename : `${filename}.${extension}`;
    
    fetch(url, {
        headers: new Headers({
          'Origin': location.origin
        }),
        mode: 'cors'
    })
    .then(response => response.blob())
    .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, completeFilename);
    })
    .catch(e => console.error(e));
}