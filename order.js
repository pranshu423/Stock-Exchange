class OrderBook{
    constructor(symbol="BTCUSD"){
        this.bids=[],
        this.ask=[],
        this._nextId=1,
        this.lastTradePrice=null
    }

    _getOrderId(){
        return this._nextId++;
    }

    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price!=b.price){
                    return b.price-a.price;
                }
                return a.timestamp-b.timestamp;
            })
        }else{
            
        }
    }

    placeOrder(symbol,side,type,price=null,quantity,user){
        let order={
            orderId:this._genOrderId(),
            symbol:this.symbol,
            side:side,
            type:type,
            price:price,
            orignQty:quantity,
            exectQty:0,
            timestamp:Date.now(),
            user:user
        }
        //let trades=[]
        if(type==="MARKET"){
            let result=this._marketMatch(order);
            if(result.remaingQty>0){
                console.log("Order completed: "+result.exectQty+" "+"cancel order: "+result.remaingQty)
            }
        }else{
            let result=this._limitMatch(order);
        }
    }

    //execute order if it is a market order
    /**
     bids: [] sorted descending
     asks: [] sorted ascending
     1. type : buy | sell
     2. if buy start buying from asks array starting from index 0
      loop while order.remainingQty>0 && asks.length>0
      buy min(order.remainingQty, asks[0].remainQty)
      update remainingQty and executeqty form both side
     */

    _marketMatch(){
        if(type="BUY"){
            let asksArr=this.ask
            let top=asksArr[0]
            while(order.remaingQty>0 && asksArr.length>0){
                let orderfill=Math.min(order.remaingQty,top.remaingQty);
                order.exectQty=order.exectQty+orderfill,
                order.remaingQty=order.remaingQty-orderfill,

                top.exectQty=top.exectQty+orderfill,
                top.remaingQty=top.remaingQty-orderfill

                //asume order.remaining>0
                if(top.remaingQty==0){
                    asksArr.shift()
                }
            }
        }
    }

    //exec order if it is a limit order
    _limitMatch(order){
        if(order==="BUY"){
            let opposite= this.ask;
            while(order.remaingQty>0 && opposite.length>0){
                let top=opposite[0];
                if(order.price>=top.price){
                    let filledOrder=Math.min(order.remaingQty,top.remaingQty);
                    order.remaingQty-=filledOrder;
                    order.exectQty+=filledOrder;



                    top.remaingQty-=filledOrder;
                    top.exectQty+=filledOrder;
                    if(top.remaingQty<=0){
                        opposite.shift();
                    }
                }
                if(order.remaingQty>0){
                    this.bids.push(order);
                    this._sort("BUY");
                }
            }
        }
        if(order==="SELL"){
            let opposite= this.bids;
            while(order.remaingQty>0 && opposite.length>0){
                let top=opposite[0];
                if(order.price<=top.price){
                    let filledOrder=Math.min(order.remaingQty,top.remaingQty);
                    order.remaingQty-=filledOrder;
                    order.exectQty+=filledOrder;



                    top.remaingQty-=filledOrder;
                    top.exectQty+=filledOrder;
                    if(top.remaingQty<=0){
                        opposite.shift();
                    }
                }
                if(order.remaingQty>0){
                    this.ask.push(order);
                    this._sort("SELL");
                }
            }
        }
    }

    getBookSnapShot(){
        return{
            lastUpdated:Date.now(),
            bids: this.bids.map((o)=>[o.price,o.remaingQty]),
            ask:this.ask.map((o)=>[o.price,o.remaingQty]),
            //current price
        }
    }
}

let BTCUSDOrderbook=new OrderBook()

// fill bids as market maker,

BTCUSDOrderbook.placeOrder("BUY","LIMIT","1500.00",10,"Prerit")
BTCUSDOrderbook.placeOrder("BUY","LIMIT","1505.00",20,"Pratham")
BTCUSDOrderbook.placeOrder("BUY","LIMIT","1506.00",10,"Pranshu")


// fill ask as market maker
BTCUSDOrderbook.placeOrder("SELL","LIMIT","1507.00",10,"Prerit")
BTCUSDOrderbook.placeOrder("SELL","LIMIT","1508.00",10,"Pratham")
BTCUSDOrderbook.placeOrder("SELL","LIMIT","1509.00",10,"Pranshu")

// BTCUSDOrderbook._sort("Book")
// console.log(BTCUSDOrderbook.bids);

console.log(BTCUSDOrderbook.getBookSnapShot());
BTCUSDOrderbook.placeOrder("BUY","MARKET",null,10,"Sharma");
console.log(BTCUSDOrderbook.getBookSnapShot());