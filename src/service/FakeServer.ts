import { IServer } from './ServerInterface';
import { CreateOrder, CreateOrderResult, GetUserInfo, GetOrdersInfo, OrderInfo } from '@/header/InterfaceDeclare';

function setTimeoutAsync(timeout: number) {
    return new Promise(v => {
        setTimeout(v, timeout);
    })
}

export class FakeServer implements IServer {
    globalId:number = 0;
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
        let info:CreateOrderResult['data'] = {
            from: co.from,
            to:co.to,
            createdAt:new Date,
            deadLine:co.deadLine,
            state:'created',
            id:`0x${(++this.globalId).toString().padStart(6,'0')}`,
            totalPrice:12,
            object:{...co.object},
            type:'sf'
        };
        this.orderList.push(info)
        await setTimeoutAsync(1000);
        return {
            success: true,
            data: info
        }
    }
    orderList:NonNullable<GetOrdersInfo['data']> = []
    async getOrderList():Promise<GetOrdersInfo>{
        await setTimeoutAsync(1000);
        return {
            success:true,
            data:[...this.orderList,{
                from: {
                    name: '家',
                    detail: '1-1',
                    siteCodes: ['1']
                },
                to:{
                    name:'公司',
                    detail:'qqq',
                    siteCodes:['2']
                },
                createdAt:new Date,
                state:'compleate',
                id:"0x000001",
                totalPrice:12,
                object:{name:'某个东西',description:''},
                type:'sf',
                deadLine:new Date()
            }]
        }
    }
    async getNearOrder():Promise<GetOrdersInfo>{
        await setTimeoutAsync(1000);
        return {
            success:true,
            data:[...this.orderList]
        }
    }
}
