const UAParser = require('ua-parser-js');
const parser = new UAParser();
exports.atEdgeViewerRequest = async (event) => {
    const request = event.Records[0].cf.request;
    const ua = request.headers['user-agent'][0].value
    // Get browser details
    const browserName = parser.setUA(ua).getBrowser().name;
    const fullBrowserVersion = parser.setUA(ua).getBrowser().version;
    const browserVersion = fullBrowserVersion.split(".",1).toString();
    const browserVersionNumber = Number(browserVersion);

    console.log(browserName, fullBrowserVersion, browserVersion, browserVersionNumber)

    // Only allow Chrome
    if (browserName !== 'Chrome') {
        request.uri = '/unsupported.html';
    }
    return request
}
