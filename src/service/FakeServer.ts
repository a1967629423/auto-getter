import { IServer } from './ServerInterface';
import { CreateOrder, CreateOrderResult, GetUserInfo, GetOrdersInfo, OrderInfo } from '@/header/InterfaceDeclare';

function setTimeoutAsync(timeout: number) {
    return new Promise(v => {
        setTimeout(v, timeout);
    })
}

export class FakeServer implements IServer {
    async getUserInfo(id?: string): Promise<GetUserInfo> {
        await setTimeoutAsync(1000);
        return {success:true,data:{
            nickname:'是我',
            id:'123456789',
            headimgurl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg',
            sex:0
        }}
    }
    static id: number = 0
    async createOrder(co: CreateOrder): Promise<CreateOrderResult> {
        let { value, error } = CreateOrder.validate(co);
        if (error) throw error;
        console.log(value);
        await setTimeoutAsync(1000);
        return {
            success: true,
            data: {
                from: {
                    name: '家',
                    detail: '1-1',
                    siteCodes: [1]
                },
                to:{
                    name:'公司',
                    detail:'qqq',
                    siteCodes:[2]
                },
                createdAt:new Date,
                state:'compleate',
                id:"0X000001",
                totalPrice:12
            },
        }
    }
    orderList:NonNullable<GetOrdersInfo['data']> = []
    async getOrderList():Promise<GetOrdersInfo>{
        await setTimeoutAsync(1000);
        return {
            success:true,
            data:[{
                from: {
                    name: '家',
                    detail: '1-1',
                    siteCodes: [1]
                },
                to:{
                    name:'公司',
                    detail:'qqq',
                    siteCodes:[2]
                },
                createdAt:new Date,
                state:'compleate',
                id:"0X000001",
                totalPrice:12
            }]
        }
    }
}
