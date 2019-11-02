import {Joi, SchemaTypeOf} from '@neushimmer/joi'
let GetUserInfoSchema = Joi.object({
    success:Joi.boolean().required(),
    data:Joi.object({
        id:Joi.string().required(),
        nickname:Joi.string().required(),
        headimgurl:Joi.string().required(),
        sex:Joi.number(),
    }),
    msg:Joi.string(),
    err:Joi.number()
});
let SiteSchema = Joi.object({
    name:Joi.string(),
    detail:Joi.string().required(),
    siteCodes:Joi.array().items(Joi.number())
})
let FamilySchema = Joi.object({
    name:Joi.string().required(),
    phone:Joi.string().required(),
    id:Joi.string().required(),
    group:Joi.string()
})
let OrderSchema = Joi.object({
    createdAt:Joi.any().custom((val,help)=>{
        let parsed = Date.parse(val)
        if(!Number.isNaN(parsed)){
            return new Date(parsed);
        }
        if(help)return help.error('0');
        throw 'convert error'
    }).required(),
    state:Joi.string().valid('created','getting','transiting','compleate').required(),
    from:SiteSchema.required(),
    to:SiteSchema.required(),
    courier:Joi.object({
        name:Joi.string().required(),
        phone:Joi.string().required(),
        id:Joi.string().required()
    }),
    family:FamilySchema,
    id:Joi.string().required(),
    totalPrice:Joi.number().required()
})
let GetOrdersInfoSchema = Joi.object({
    success:Joi.boolean().required(),
    data:Joi.array().items(OrderSchema),
    msg:Joi.string(),
    err:Joi.number()
})

let CreateOrderSchema = Joi.object({
    from:SiteSchema.required(),
    to:SiteSchema.required(),
    family:FamilySchema.required(),
})
let CreateOrderResultScheam = Joi.object({
    success:Joi.boolean().required(),
    data:OrderSchema.required(),
    msg:Joi.string(),
    err:Joi.number()
})
export var GetUserInfo = GetUserInfoSchema;
export type GetUserInfo = SchemaTypeOf<typeof GetUserInfoSchema>

export var GetOrdersInfo = GetOrdersInfoSchema;
export type GetOrdersInfo = SchemaTypeOf<typeof GetOrdersInfoSchema>

export var OrderInfo = OrderSchema;
export type OrderInfo = SchemaTypeOf<typeof OrderSchema>

export var CreateOrder = CreateOrderSchema;
export type CreateOrder = SchemaTypeOf<typeof CreateOrderSchema>

export var CreateOrderResult = CreateOrderResultScheam;
export type CreateOrderResult = SchemaTypeOf<typeof CreateOrderResultScheam>

