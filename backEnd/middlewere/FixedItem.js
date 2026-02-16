import { ItemModel } from "../models/ItemModel.js"

export const defaultItems=async()=>{
        try{
        const count=await ItemModel.countDocuments()
        
        if(count <=1){
            await ItemModel.insertMany([

                 {softwareName:'DMSReg V 1.9',
                    validityPeriod:'30 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:1999,
                    ItemType:'GOL'
                },

                {softwareName:'DMSReg V 2.9',
                    validityPeriod:'30 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:2999,
                    ItemType:'VIP'
                },


                {softwareName:'DMSReg V 3.9',
                    validityPeriod:'35 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:3999,
                    ItemType:'DIA'
                },


                   {softwareName:'DMSReg V 1.9',
                    validityPeriod:'35 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:1999,
                    ItemType:'BASIC'
                },


                {softwareName:'DMSReg V 2.9',
                    validityPeriod:'30 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:2999,
                    ItemType:'STANDARD'
                },

                {softwareName:'DMSReg V 2.9',
                    validityPeriod:'30 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:2999,
                    ItemType:'ADVANCED'
                },


                {softwareName:'DMSReg V 3.9',
                    validityPeriod:'35 Day',
                    paymentType:'ONLINE',
                    des:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges',
                    Amount:3999,
                    ItemType:'PROFESSIONAL'
                },

                   
            ])

            console.log("default added successfully ")
        }

        else{
            return;
        }
        }
        catch(e){
        console.log(e.message)
        }
} 