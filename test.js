process.argv[2]='inputData.txt'
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;
sinon.spy(console, 'log');

const functionmodule = require('./functions.js')
sinon.spy(functionmodule);
const mainmodule = require('./main.js')
sinon.spy(mainmodule);
const {main,addProgram,applyCoupon,printBill,data}=functionmodule

describe('', () => { 
  afterEach(()=>{
    Object.keys(functionmodule).forEach(function (key) {
        functionmodule[key].resetHistory()
    });
    console.log.resetHistory()
  })
  describe('addPrd', () => { 
    it("should be a function", () => {    
        expect(addProgram).to.be.a("function")
     });
     it("should add a course", () => {    
         addProgram('DEGREE',1)
         applyCoupon('DEAL_G5')
         printBill()
         const { cost,coupon } = data()
         expect(coupon).equal('')
         expect(cost[0]).equal(5000);
      });
     it("should add a course", () => {    
         addProgram('CERTIFICATION',1)
         applyCoupon('DEAL_G5')
         applyCoupon('G5')
         main(['print'])
         const { cost,coupon } = data()
         expect(coupon).equal('DEAL_G5')
         expect(cost[1]).equal(3000);
      });
     it("should add a course", () => {    
         addProgram('DIPLOMA',1)
         applyCoupon('DEAL_G5')
         applyCoupon('DEAL_G20')
         const { cost,coupon } = data()
         expect(coupon).equal('DEAL_G20')
         expect(cost[2]).equal(2500);
      });
     it("should apply coupon B4G1", () => {  
         addProgram('DEGREE',1)
         applyCoupon('DEAL_G5')
         const { coupon } = data()
         expect(coupon).equal('B4G1');
      });
      it("should add a course", () => {    
        printBill()
        expect(console.log).to.have.been.callCount(6)
      });
    })
      describe('main', () => {
      it("should add a course", () => {
        let inputa='sample_input/input1.txt'
        let input=['ADD_PROGRAMME CERTIFICATION 1','ADD_PROGRAMME DEGREE 2','ADD_PROGRAMME DIPLOMA 2',
        'APPLY_COUPON DEAL_G20','APPLY_COUPON DEAL_G5','ADD_PRO_MEMBERSHIP','PRINT_BILL']
          main(input)
          mainmodule.takeInput(inputa)
          const { total } = data()
          expect(total).equal(30430);
       });
      })
    })