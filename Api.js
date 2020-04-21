class Api {
    constructor(options) {
        this.options = options;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })

        .then((res) => {
            return this._getResponseData(res);
        })
    }

    getUserData() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
        .then((res) => {
            return this._getResponseData(res);
        })
    }

    sendUserData(userName, userAbout) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
        .then((res) => {
            return this._getResponseData(res);
        })
    }

}

