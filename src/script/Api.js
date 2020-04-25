export class Api {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
               authorization: this.token 
            }
        })

        .then((res) => {
            return this._getResponseData(res);
        })
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
               authorization: this.token 
            }
        })
        .then((res) => {
            return this._getResponseData(res);
        })
    }

    sendUserData(userName, userAbout) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-type': 'application/json'
             },
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

