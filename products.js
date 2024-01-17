const allproducts = [
  { productname: "A", price: 20 },
  { productname: "B", price: 40 },
  { productname: "C", price: 50 },
];
let bulk_10_discount_amount;
let bulk_5_discount_amount;
let flat_10_discount_amount;
let tiered_50_discount_amount;
let offeres = [];
let shippingFee = 0;
let wrapFee;
let highestOffer;

const cart = { products: [], totalUnits: 0, totaolCoast: 0 };
const getTotalProducts = () => {
  for (let i = 0; i < allproducts.length; i++) {
    let itemCount = parseInt(
      prompt(`enter the number of products for ${allproducts[i].productname}`)
    );

    if (Number.isInteger(itemCount) && itemCount > 0) {
      let itemWrapAsGift = confirm(
        "do you want to wrap the product as gift ? "
      );
      cart.products.push({
        product: allproducts[i].productname,
        productPrice: allproducts[i].price,
        count: itemCount,
        totalPrice: allproducts[i].price * itemCount,
        isGift: itemWrapAsGift,
      });
      cart.totalUnits = itemCount + cart.totalUnits;
      if (itemWrapAsGift) {
        cart.totaolCoast = cart.totaolCoast + allproducts[i].price * itemCount;
      } else {
        cart.totaolCoast = cart.totaolCoast + allproducts[i].price * itemCount;
      }
    }
  }
};

getTotalProducts();

const flat_10_discount = () => {
  if (cart.totaolCoast > 200) {
    flat_10_discount_amount = (cart.totaolCoast * 10) / 100;
    offeres.push({
      offerName: "flat_10_discount",
      offerAmount: flat_10_discount_amount,
    });
    // cart.totaolCoast = cart.totaolCoast - dicountAmount;
  }
};

const bulk_5_discount = () => {
  cart.products.forEach((item) => {
    if (item.count > 10) {
      bulk_5_discount_amount = (item.totalPrice * 5) / 100;
      //   item.totalPrice = item.totalPrice - discountAmount;
      offeres.push({
        offerName: "bulk_5_discount",
        offerAmount: bulk_5_discount_amount,
      });
    }
  });
};

const bulk_10_discount = () => {
  if (cart.totalUnits > 20) {
    bulk_10_discount_amount = (cart.totaolCoast * 10) / 100;
    // cart.totaolCoast = cart.totaolCoast - dicountAmount;
    offeres.push({
      offerName: "bulk_10_discount",
      offerAmount: bulk_10_discount_amount,
    });
  }
};

const addShippingFee = () => {
  let numberOfPackages = Math.ceil(cart.totalUnits / 10);
  shippingFee = numberOfPackages * 5;
  //   cart.totaolCoast = cart.totaolCoast + shippingFee;

  //   console.log("shipping fee", shippingFee);
};

const tiered_50_discount = () => {
  let checkMoreThan15Units = cart.products.filter((item) => item.count > 15);

  if (cart.totalUnits > 30 && checkMoreThan15Units.length != 0) {
    for (let i = 0; i < checkMoreThan15Units.length; i++) {
      let product = checkMoreThan15Units[i];

      //Apply 50% discount to quantities above 15
      let discountQuantity = product.count - 15;
      let singleProductOfPriceAfterDiscount = (product.productPrice * 50) / 100;
      tiered_50_discount_amount =
        discountQuantity * singleProductOfPriceAfterDiscount;
      let totalPriceOfNonDiscntQntity = 15 * product.productPrice;
      offeres.push({
        offerName: "tiered_50_discount",
        offerAmount: totalPriceOfNonDiscntQntity,
      });
      //   product.totalPrice =
      //     priceOfDiscountQuantity + totalPriceOfNonDiscntQntity;
    }
  }
};

const totalCartAmount = () => {
  let grandTotal = cart.products.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
};
bulk_5_discount();

flat_10_discount();

tiered_50_discount();

bulk_10_discount();

addShippingFee();

// totalCartAmount();
const offerNeedTobeApply = () => {
  //   let amountTobeOff = Math.max(...offeres);

  highestOffer = offeres?.reduce((maxOffer, offer) => {
    return offer?.offerAmount > maxOffer.offerAmount ? offer : maxOffer;
  }, offeres[0]); // Start with the first offer as a placeholder

  //   console.log("Highest offer:", highestOffer);

  //   console.log(highestOffer, "high");

  highestOffer
    ? (cart.totaolCoast = cart.totaolCoast - highestOffer?.offerAmount)
    : "";
};
console.log("  Products in Cart");
for (let i = 0; i < cart.products.length; i++) {
  console.log(
    "Product Name:",
    cart.products[i].product + "," + "Product Price: ",
    cart.products[i].productPrice + "," + "Product Count :",
    cart.products[i].count + "," + "Wrap as gift :",
    cart.products[i].isGift + "," + "Total Item Cost :",
    cart.products[i].totalPrice
  );
}
const calculateWrapFee = () => {
  let wrapItems = cart.products.filter((item) => item.isGift === true);
  let wrapNum;
  if (wrapItems.length !== 0) {
    wrapNum = wrapItems.reduce((acc, item) => acc + item.count, 0);
  }

  wrapFee = wrapNum * 1;
};
calculateWrapFee();
offerNeedTobeApply();

// console.log("Total Coast:  ", cart.totaolCoast + wrapFee + shippingFee);
console.log(
  "offer Applied :",
  highestOffer
    ? highestOffer.offerName
    : "This purchase is not eligible for applying any offers"
);
console.log(
  "offer Amount :",
  highestOffer
    ? highestOffer.offerAmount
    : "This purchase is not eligible for applying any offers"
);
offeres.length !== 0
  ? console.log("Total Amount After applied offer:", cart.totaolCoast)
  : "";
shippingFee
  ? console.log("Shipping fee : ", shippingFee)
  : console.log("No Shipping fee");
wrapFee ? console.log("Wrap fee :", wrapFee) : console.log("No Wrapping Fee");
console.log(
  "Total Cost (include wrap fee and package fee)",
  cart.totaolCoast + wrapFee + shippingFee
);
