// ----- Типи товарів -----
type BaseProduct = {
  id: number;
  name: string;
  price: number;
};

type Books = BaseProduct & {
  category: "books";
  autor: string | string[];
};

type Clothing = BaseProduct & {
  category: "clothing";
  size: "S" | "M" | "L" | "XL";
  color: string;
};

type Electronics = BaseProduct & {
  category: "electronics";
  type: "phone" | "laptop" | "tablet";
};

// ----- Тип елемента кошика -----
type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};

// ----- Функції для кошика -----

/** Підрахунок загальної вартості кошика */
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

/** Додавання товару до кошика */
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T | undefined,
  quantity: number
): CartItem<T>[] => {
  if (!product || quantity <= 0) return cart; // перевірка вхідних даних
  const item = cart.find((i) => i.product.id === product.id);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

// ----- Пошук та фільтрація товарів -----

/** Пошук товару по id */
const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  return products.find((p) => p.id === id);
};

/** Фільтрація товарів за максимальною ціною */
const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  return products.filter((p) => p.price <= maxPrice);
};

// ----- Тести -----
function test(): void {
  console.log("Тестування інтернет-магазину");

  // Тестові дані
  const electronics: Electronics[] = [
    {
      id: 1,
      name: "Телефон",
      price: 12000,
      category: "electronics",
      type: "phone",
    },
    {
      id: 2,
      name: "Ноутбук",
      price: 25000,
      category: "electronics",
      type: "laptop",
    },
  ];
  const books: Books[] = [
    {
      id: 3,
      name: "TypeScript Handbook",
      price: 800,
      category: "books",
      autor: "Microsoft",
    },
    {
      id: 4,
      name: "Clean Code",
      price: 1000,
      category: "books",
      autor: "Robert C. Martin",
    },
  ];
  const clothing: Clothing[] = [
    {
      id: 5,
      name: "Футболка",
      price: 400,
      category: "clothing",
      size: "M",
      color: "Червоний",
    },
    {
      id: 6,
      name: "Джинси",
      price: 1500,
      category: "clothing",
      size: "L",
      color: "Синій",
    },
  ];

  const phone = findProduct(electronics, 1);
  const cart = addToCart([] as CartItem<BaseProduct>[], phone, 1);
  const total = calculateTotal(cart);

  console.log("Початковий кошик:", cart);
  console.log("Початкова загальна вартість:", total);

  // Додаємо товари
  addToCart(cart, findProduct(electronics, 1), 1);
  addToCart(cart, findProduct(books, 4), 2);
  addToCart(cart, findProduct(clothing, 5), 3);

  console.log("Кошик після додавання товарів:", cart);
  console.log("Загальна вартість:", calculateTotal(cart));

  // Фільтрація
  const cheapProducts = filterByPrice(
    [...electronics, ...books, ...clothing],
    1000
  );
  console.log("Товари з ціною до 1000:", cheapProducts);

  // Тест повторного додавання того ж товару
  addToCart(cart, findProduct(clothing, 5), 2); // має збільшити кількість
  console.log("Кошик після додавання ще однієї Футболки:", cart);
  console.log("Нова загальна вартість:", calculateTotal(cart));
}

test();
