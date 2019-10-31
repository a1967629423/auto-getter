import { IServer } from './ServerInterface';
import { CreateOrder, CreateOrderResult } from '@/header/InterfaceDeclare';

function setTimeoutAsync(timeout: number) {
    return new Promise(v => {
        setTimeout(v, timeout);
    })
}

export class FakeServer implements IServer {
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
            },
        }
    }
}
