import Link from "next/link";
import { CartContent } from "./cart-content";
import { getCartLineItems, getUnavailableCartItems } from "./cart-data";
import { getSiteSettings } from "../site-settings";

type CartPageProps = {
  searchParams: Promise<{ invalid?: string }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const [items, settings] = await Promise.all([
    getCartLineItems(),
    getSiteSettings(),
  ]);
  const { invalid } = await searchParams;
  const unavailableItems = getUnavailableCartItems(items);

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900">
            SHOP
          </Link>
          <span>/</span>
          <span>CART</span>
        </div>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            장바구니
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-600">
            담아둔 상품과 수량, 예상 결제 금액을 확인합니다.
          </p>
        </div>

        <CartContent
          initialItems={items}
          hasInitialWarning={Boolean(invalid) || unavailableItems.length > 0}
          shippingFee={settings.shippingFee}
          freeShippingMinimum={settings.freeShippingMinimum}
        />
      </div>
    </main>
  );
}
