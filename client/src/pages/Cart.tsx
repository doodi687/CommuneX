import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom } from "../store/atoms/cart";
import { Suspense, useEffect, useState } from "react";
import { Item } from "../store/dataTypes";
import { UserAtom } from "../store/atoms/user";
import { updateCart } from "../utils/handleCart";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import { CartItem } from "../components/CartItem";

const Cart = () => {
  const [cart, setCart] = useRecoilState<Item[]>(CartAtom);
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  /* ================= CONTACT ================= */

  const handleContact = (item: Item) => {
    if (!user?.user?.id) return;

    const buyerId = user.user.id;
    const sellerId = item.ownerId;

    navigate(`/chats/${buyerId}_${sellerId}`);
  };

  /* ================= TOTAL CALCULATION ================= */

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalAmount(total);
  }, [cart]);

  /* ================= DELETE ================= */

  const handleDelete = (item: Item) => {
    const newCart = cart.filter((it) => it.id !== item.id);
    setCart(newCart);
  };

  /* ================= INCREASE ================= */

  const handleIncrease = (item: Item) => {
    const updatedCart = cart.map((it) =>
      it.id === item.id
        ? { ...it, quantity: it.quantity + 1 }
        : it
    );
    setCart(updatedCart);
  };

  /* ================= DECREASE ================= */

  const handleDecrease = (item: Item) => {
    const updatedCart = cart.map((it) =>
      it.id === item.id && it.quantity > 1
        ? { ...it, quantity: it.quantity - 1 }
        : it
    );
    setCart(updatedCart);
  };

  /* ================= UPDATE CART (ONLY IF LOGGED IN) ================= */

  useEffect(() => {
    if (user?.token) {
      updateCart(cart, user);
    }
  }, [cart, user]);

  return (
    <Suspense fallback={<LoadingSpin />}>
      <section className="flex flex-col justify-center p-5 min-h-screen">
        <div className="poppins-regular border-2 shadow-lg p-8">
          <h1 className="text-3xl font-semibold">Your Cart</h1>

          {cart.length === 0 && (
            <p className="text-gray-500 mt-4">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              navigate={navigate}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleContact={handleContact}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        <div className="flex items-center justify-between p-8 bg-white border-2 mt-4">
          <h1 className="text-2xl font-semibold">Total Amount</h1>
          <p className="text-2xl font-bold text-orange-600">
            Rs. {totalAmount}
          </p>
        </div>
      </section>
    </Suspense>
  );
};

export default Cart;