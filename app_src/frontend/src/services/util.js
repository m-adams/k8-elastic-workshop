export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

export const productsAPI = "/api/items";
export const productDetailsAPI = "/api/items/";
export const orderAPI = "/api/orders";
