const fetch = require('node-fetch');
const md5 = require('blueimp-md5');
const config = require('../config');
const MeituanUsers = require('../models/meituan-v1/users');


module.exports = class MeituanAPI {
  constructor() {
    this.meituanAppId = config.meituanAppId;
    this.meituanSecret = config.meituanSecret;
    this.baseUrl = 'https://openapi.waimai.meituan.com/openapi/v1/';
    this.oauthUrl = 'https://openapi.waimai.meituan.com/oauth/authorize';
    this.refreshTokenUrl = 'https://openapi.waimai.meituan.com/oauth/refresh_token';
    this.meituanOauthUrl = config.meituanOauthUrl;
  }

  async request(resource, userId, data = {}, type = 'GET', resType = 'JSON') {
    let url = this.baseUrl + resource;
    const signedData = {
      ...data,
      timestamp: Date.now(),
      app_id: this.meituanAppId,
      access_token: await MeituanUsers.findOne({ userId }),
    };

    let dataStr = '';
    Object.keys(data).sort().forEach((key) => {
      dataStr += `${key}=${data[key]}&`;
    });

    let combinedUrl = url;
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      combinedUrl = `${url}?${dataStr}`;
    }
    signedData.sign = md5(combinedUrl + this.meituanSecret);

    if (type.toUpperCase() === 'GET') {
      url = `${combinedUrl}&sign=${signedData.sign}`;
    }

    const requestConfig = {
      method: type.toUpperCase(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (type.toUpperCase() === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(signedData),
      });
    }

    await fetch(url, requestConfig).then((res) => {
      if (res.ok) {
        return resType.toUpperCase() === 'TEXT' ? res.text() : res.json();
      }
      const err = new Error(res.statusText);
      err.response = res;
      throw err;
    }).catch((err) => {
      console.log('Error making HTTP request: ', err);
      throw new Error(err);
    });
  }

  async refreshToken(userId, res, callback = '') {
    if (!await MeituanUsers.findOne({ meituanOpenId: userId })) {
      res.redirect(`${this.oauthUrl}?app_id=${this.meituanAppId}&redirect_uri=${this.meituanOauthUrl}&response_type=code&scope=&state=`);
    }

    await fetch(`${this.refreshTokenUrl}?app_id=${this.meituanAppId}&secret=${this.meituanSecret}&code=&grant_type=refresh_token`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }
};
