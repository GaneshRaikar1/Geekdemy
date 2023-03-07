const programs={ CERTIFICATION:3000, DEGREE:5000, DIPLOMA:2500 }
let cost=[]
let subTotal=0
let coupon=''
let couponDiscount=0
let proMember=false
let proDiscount=0
let enrollmentFee=0
let total=0

const addProgram = (program,count) => { 
    for(var i=0;i<count;i++){
        cost.push(programs[program])
        subTotal+=parseFloat(programs[program])
    }
 }

const applyCoupon = (newCoupon) => { 
    if(cost.length>3){ coupon='B4G1' }
    else{
        if(newCoupon==='DEAL_G20'){
            if(subTotal>=10000){coupon=newCoupon}
        }else if(newCoupon==='DEAL_G5'){
            if(cost.length>1 && coupon!=='DEAL_G20'){ coupon=newCoupon }
        }else{console.log(`Invalid_Coupon= ${newCoupon}`);}
    }
 }

const calculateBill = () => { 
    if(proMember){
        cost.map(price=>(price===5000)?proDiscount+=150:(price===3000)?proDiscount+=60:proDiscount+=25)
        subTotal=subTotal+200-proDiscount
    }
    total=subTotal
    if(coupon==='B4G1') {
        (couponDiscount=Math.min( ...cost ))
        if(proMember)couponDiscount-=Math.min( ...cost )===5000?150:Math.min( ...cost )===3000?60:25
    } 
    coupon==='DEAL_G20' && (couponDiscount=total*.2)
    coupon==='DEAL_G5' && (couponDiscount=total*.05)
    total-=couponDiscount
    if(total<6666){
        enrollmentFee=500
        total+=enrollmentFee
    }
 }
const proMem = () => { proMember=true }
const printBill = () => { 
    calculateBill()
    console.log("SUB_TOTAL", subTotal.toFixed(2));
    console.log("COUPON_DISCOUNT",coupon?coupon:'NONE',couponDiscount.toFixed(2));
    console.log("TOTAL_PRO_DISCOUNT",proDiscount.toFixed(2));
    console.log("PRO_MEMBERSHIP_FEE",proMember?'200.00':'0.00');
    console.log("ENROLLMENT_FEE",enrollmentFee.toFixed(2));
    console.log("TOTAL",total.toFixed(2));

}
const main = (commands) => {   
    for (i = 0; i < commands.length; i++) {
        if (commands) {
             let params = commands[i].split(' ')
            switch (params[0].trim()) {
                case 'ADD_PROGRAMME':addProgram(params[1],parseInt(params[2]));
                break;
                case 'APPLY_COUPON':applyCoupon(params[1].trim());
                break;
                case 'ADD_PRO_MEMBERSHIP':proMem();
                break;
                case 'PRINT_BILL':printBill();
                break;
                default:console.log(`Input_Error=${params}`);return;
            }
        }
    } 
 }

const data = () => { return {cost,subTotal,coupon,couponDiscount,proMember,proDiscount,enrollmentFee,total} }
module.exports={main,addProgram,applyCoupon,printBill,proMem,data}