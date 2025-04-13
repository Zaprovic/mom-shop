import { SelectProductWithCategoryType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = SelectProductWithCategoryType & {
  quantity?: number;
};

type CartStore = {
  items: CartItem[];
  quantity: number;

  addItem: (product: SelectProductWithCategoryType) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  isInCart: (productId: number) => boolean;
  toggleItem: (product: SelectProductWithCategoryType) => void;

  hydrate: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      quantity: 0,

      addItem: (product) =>
        set((state) => {
          // Check if product is already in cart
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            // If it exists, update quantity
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item,
              ),
              quantity: state.quantity + 1,
            };
          } else {
            // If it's new, add to cart with quantity 1
            return {
              items: [...state.items, { ...product, quantity: 1 }],
              quantity: state.quantity + 1,
            };
          }
        }),

      removeItem: (productId) =>
        set((state) => {
          const itemToRemove = state.items.find(
            (item) => item.id === productId,
          );
          const quantityToRemove = itemToRemove?.quantity || 1;

          return {
            items: state.items.filter((item) => item.id !== productId),
            quantity: state.quantity - quantityToRemove,
          };
        }),

      updateQuantity: (productId, newQuantity) =>
        set((state) => {
          const oldItem = state.items.find((item) => item.id === productId);
          const oldQuantity = oldItem?.quantity || 1;
          const quantityDiff = newQuantity - oldQuantity;

          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item,
            ),
            quantity: state.quantity + quantityDiff,
          };
        }),

      clearCart: () => set({ items: [], quantity: 0 }),

      isInCart: (productId) => {
        const state = get();
        return state.items.some((item) => item.id === productId);
      },

      toggleItem: (product) => {
        const state = get();
        if (state.isInCart(product.id)) {
          state.removeItem(product.id);
        } else {
          state.addItem(product);
        }
      },

      hydrate: () => {},
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      storage: createJSONStorage(() => {
        // Check if window is defined (client-side)
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Return mock storage for server-side
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
    },
  ),
);
