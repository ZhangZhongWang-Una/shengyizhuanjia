export class Register {
    // 注册实体类的实现
    phone: string;
    email: string;
    shopName: string;
    password: string;
    confirmPassword: string;

    constructor(data: any = {}) {
        this.phone = data.phone || '';
        this.email = data.email || '';
        this.shopName = data.shopName || '';
        this.password = data.password || '';
        this.confirmPassword = data.confirmPassword || '';
    }


}
