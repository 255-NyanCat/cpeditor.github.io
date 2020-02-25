function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function fetch_latest_release() {

    let uri = 'https://api.github.com/repos/cpeditor/cp-editor/releases/latest'

    fetch(uri)
        .then(res => res.json())
        .then((data) => {

            os = getOS()
            let directUrl = 'https://github.com/cpeditor/cp-editor/releases/latest'

            data.assets.forEach(release => {
                if (release.name.endsWith(".exe")) {
                    document.getElementById('download_windows').setAttribute('href', release.browser_download_url)
                    if (os === "Windows") directUrl = release.browser_download_url
                }else if (release.name.endsWith(".dmg")) {
                    document.getElementById('download_mac').setAttribute('href', release.browser_download_url)
                    if (os === "Mac OS") directUrl = release.browser_download_url
                }else if (release.name.endsWith(".AppImage")) {
                    document.getElementById('download_linux').setAttribute('href', release.browser_download_url)
                    if (os === "Linux") directUrl = release.browser_download_url
                }
            });

            if (os === "Windows" || os === "Linux" || os === "Mac OS") {
                document.getElementById('download_by_os').setAttribute('href', directUrl)
                document.getElementById('download_by_os').innerText = 'Get for ' + getOS()

                document.getElementById('download_by_os_bottom').setAttribute('href', directUrl)
                document.getElementById('download_by_os_bottom').innerText = 'Try it on ' + getOS()

            }

        })
}

fetch_latest_release()


