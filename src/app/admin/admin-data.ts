import { mockUser, myPageOrders, shopProducts } from "../site-data";

export const adminNavItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Members", href: "/admin/members" },
  { label: "Settings", href: "/admin/settings" },
];

export const adminProducts = shopProducts.map((product, index) => ({
  ...product,
  id: product.slug,
  visible: index !== 7,
  soldOut: index === 4,
  createdAt: index < 4 ? "2026.04.22" : "2026.04.18",
}));

export const adminOrders = myPageOrders.map((order, index) => ({
  ...order,
  id: order.orderNumber,
  buyer: index === 0 ? mockUser.name : "이오브제",
  paymentStatus: "결제 완료",
  orderStatus: order.status,
}));

export const adminMembers = [
  {
    id: "member-001",
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    joinedAt: mockUser.joinedAt,
    orderCount: 2,
    totalPaid: "₩138,000",
  },
  {
    id: "member-002",
    name: "이오브제",
    email: "table@objetdoux.com",
    phone: "010-9876-5432",
    joinedAt: "2026.04.18",
    orderCount: 1,
    totalPaid: "₩42,000",
  },
];

export function getAdminProductById(id: string) {
  return adminProducts.find((product) => product.id === id);
}

export function getAdminOrderById(id: string) {
  return adminOrders.find((order) => order.id === id);
}
