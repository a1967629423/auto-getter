import { CreateOrder, CreateOrderResult } from '@/header/InterfaceDeclare';

export interface IServer{
    createOrder(co:CreateOrder):Promise<CreateOrderResult>
    
}