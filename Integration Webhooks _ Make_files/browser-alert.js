/* eslint-disable */
function isIe() {
	if (window.document.documentMode) {
		return true;
	}

	return false;
}

function isWin10() {
	return window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1;
}

function httpGet(url) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open('GET', url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

function check() {
	if (isIe()) {
		var elem = document.getElementById('browser-alert');
		var edgeUrl = 'https://www.microsoft.com/edge';
		if (isWin10()) {
			edgeUrl = 'microsoft-edge:' + window.location.href;
		}

		var publicPathEl = document.querySelector('integromat');
		var publicPath = '';

		if (publicPathEl && publicPathEl.dataset && publicPathEl.dataset.publicPath) {
			publicPath = publicPathEl.dataset.publicPath;

			if (!publicPath.endsWith('/')) {
				publicPath = publicPath + '/';
			}
		} else {
			publicPath = '/';
		}

		var template = httpGet(publicPath + 'static/html/browser-alert.html');

		template = template.replace('{edgeUrl}', edgeUrl);
		template = template.replace(/{PUBLIC_PATH}/g, publicPath);

		elem.innerHTML = template;
	}
}

check();
