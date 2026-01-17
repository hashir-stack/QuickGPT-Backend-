const Stripe = require("stripe");
const Transaction = require("../model/Transaction.js");
const User = require("../model/User.js");

exports.stripeWebhooks = async (request , response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create Stripe Signature
    const sig = request.headers["stripe-signature"];

    let event ;

    try {
        event = stripe.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return response.status(400).send(` Webhook Error : ${error.message} `);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded" :{
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent:paymentIntent.id,
                })

                const session = sessionList.data[0];
                const {transactionId ,appId} = session.metadata;

                if(appId === "QuickGPT"){
                    const transaction = await Transaction.findOne({_id:transactionId, isPaid:false});

                    // Update Credits in User A/c
                    await User.updateOne({_id:transaction.userId},{$inc:{
                        credits:transaction.credits
                    }});

                    // Update Creadit Status
                    transaction.isPaid = true;
                    await transaction.save();
                }else{
                    return response.json({
                        received :true,
                        message:"Ignored event : Invalid App"
                    })
                }
                break;
            }
            default :
                console.log("Unhandled Event Type : " , event.type)
                break;
        }

        response.json({
            received:true
        })
    } catch (error) {
        console.log("WebHook processing Error :" ,error);
        response.status(500).send("Internal Server Error");
    }
}