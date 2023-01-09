export function getProductName(product) {
    let name = product.name;
    if (product.flavor) {
      name += ` ${product.flavor}`;
    }
    if (product.complement) {
      name += ` com ${product.complement}`;
    }
    return name
  }