class OrderBook{
    constructor(symbol="BTCUSD"){
        this.bids=[],
        this.ask=[],
        this._nextId=1,
        this.lastTradedPrice=null
    }
    //helper
    _genorderId(){
        return this._nextId++
    }
    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price===b.price){
                    return b.price-a.price
                }
                return b.timestamp - a.timestamp
            })
        }else{

        }
    }
    placeOrder() {

    }
    _marketMatch() {

    }
    _limitMatch() {

    }
}

let BTCUSDOrderBook=new OrderBook()


BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",TYPE:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sharma"})
BTCUSDOrderBook.bids.push({orderId:1,side:"BUY",TYPE:"LIMIT",price:101,quantity:5,timestamp:Date.now(),user:"Siwach"})
BTCUSDOrderBook.bids.push({orderId:3,side:"BUY",TYPE:"LIMIT",price:101,quantity:15,timestamp:Date.now(),user:"Gaajjar"})

BTCUSDOrderBook._sort("BUY")
console.log(BTCUSDOrderBook.bids);