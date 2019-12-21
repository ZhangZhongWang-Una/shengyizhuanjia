import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {

  // 用于保存验证码
  private code: string;
  // 存放验证码的过期时间
  private deadline: number;
  // sdkaappid
  private sdkAppId = '1400297418';
  // sdkapiid 对应的 appkey
  private appKey = '';
  // url中的random 字段的值
  private strRand = Math.floor(Math.random() * 10000000000);
  // 时间戳
  private now = Math.floor(Date.now() / 1000);
  constructor(private httpClient: HttpClient) {
      this.code = '';
  }
  // 生成指定长度的随机数字
  createCode(count: number): string {
      this.code = '';
      // 10分钟内有效
      this.deadline = Date.now() + 60 * 10 * 1000;
      for (let i = 0; i < count; i++) {
          const num = Math.floor(Math.random() * 10);
          this.code += num.toString();
      }
      return this.code;
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean {
      const now = Date.now();
      // console.log(value == this.code)
      return value === this.code && now < this.deadline;
  }

 // 发送短信
 sendSms(phone: string , count: number): void {
  this.code = '';
  this.deadline = Date.now() + 60 * 10 * 1000;
  let strSig = 'appkey=' + this.appKey + '&random=' + this.strRand + '&time=' + this.now + '&mobile=' + phone;
  let url = '/api' + '?sdkappid=' + this.sdkAppId + '&random=' + this.strRand;
  let sig = CryptoJS.SHA256(strSig) + '';
  for (let i = 0; i < count; i++) {
    let num = Math.floor(Math.random() * 10);
    this.code += num.toString();
}
console.log('验证码：' + this.code);
  this.httpClient.post(url, {
      'ext': '',
      'extend': '',
      'params': [
          this.code,
      ],
      'sig': sig,
      'sign': '张钟旺旺旺',
      'tel': {
          'mobile': phone,
          'nationcode': '86'
      },
      'time': this.now,
      'tpl_id': 503614
  }).toPromise().then(response => {
      let res = response;
      console.log(res);
  });
 }
}
