const timmy = {
  prescription: "acetaminophen",
  pricePerRefill: 25,
  refills: 3,
  subscription: false,
  coupon: true,
};

const sarah = {
  prescription: "diphenhydramine",
  pricePerRefill: 50,
  refills: 1,
  subscription: true,
  coupon: false,
};

const rocky = {
  prescription: "phenylephrine",
  pricePerRefill: 30,
  refills: 5,
  subscription: true,
  coupon: true,
};

const SUBSCRIPTION_DISCOUNT_RATE = 0.25;
const COUPON_DISCOUNT = 10;

// given customer data objects with keys including prescription, price per refill, refills, subscription status, and coupon status, print, within a template literal, a grand total which incorporates subscription and coupon discounts

// first function will input individual refill price and refill amount, and return price for all refills
const calculateRefillsPrice = (refillCost, numberRefills) =>
  refillCost * numberRefills;

// second function will input customer subscription status return customer subscriber discount rate
const calculateSubscriberRate = (isSubscriber) =>
  isSubscriber ? 1 - SUBSCRIPTION_DISCOUNT_RATE : 1;

// third function will input customer coupon status and return customer coupon discount amount
const calculateCouponDiscount = (hasCoupon) =>
  hasCoupon ? -COUPON_DISCOUNT : 0;

// fourth function will calculate final price.
// To calculate final price, apply customer discount rate to total refill price. then apply customer coupon discount amount.
const calculateFinalPrice = (customer) =>
  calculateRefillsPrice(customer.pricePerRefill, customer.refills) *
    calculateSubscriberRate(customer.subscription) +
  calculateCouponDiscount(customer.coupon);

let customerName = sarah;
console.log(`Your grand total is $${calculateFinalPrice(customerName)}`);
