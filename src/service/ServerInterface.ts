import { CreateOrder, CreateOrderResult, GetUserInfo, GetOrdersInfo } from '@/header/InterfaceDeclare';

export interface IServer{
    createOrder(co:CreateOrder):Promise<CreateOrderResult>
    getUserInfo(id?:string):Promise<GetUserInfo>
    getOrderList():Promise<GetOrdersInfo>
    getNearOrder():Promise<GetOrdersInfo>
}