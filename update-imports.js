import fs from "fs";

const updates = [
  {
    path: "hooks/useFavoriteSneaker.js",
    replacements: [
      {
        old: 'import { createFavorite, removeFavorite } from "@/lib/data-service";',
        new: 'import { createFavorite, removeFavorite } from "@/services/favorite-service";',
      },
    ],
  },
  {
    path: "app/_components/ui/Review/ReviewComponent.js",
    replacements: [
      {
        old: 'import { upsertReview } from "@/lib/data-service";',
        new: 'import { upsertReview } from "@/services/reviews-service";',
      },
    ],
  },
  {
    path: "app/_components/ui/SearchModal/SearchModal.js",
    replacements: [
      {
        old: 'import { getSneakerSearch } from "@/lib/data-service";',
        new: 'import { getSneakerSearch } from "@/services/sneakers-service";',
      },
    ],
  },
  {
    path: "app/_components/cart/CartSummary.js",
    replacements: [
      {
        old: 'import { createOrder } from "@/lib/data-service";',
        new: 'import { createOrder } from "@/services/orders-service";',
      },
    ],
  },
  {
    path: "app/_components/layout/Main/Catalog.js",
    replacements: [
      {
        old: 'import { getSneakers } from "@/lib/data-service";',
        new: 'import { getSneakers } from "@/services/sneakers-service";',
      },
    ],
  },
  {
    path: "app/_components/products/Details/sneakerDetails.js",
    replacements: [
      {
        old: 'import { createFavorite, removeFavorite } from "@/lib/data-service";',
        new: 'import { createFavorite, removeFavorite } from "@/services/favorite-service";',
      },
    ],
  },
  {
    path: "app/(products)/sneakers/nav/releases/page.js",
    replacements: [
      {
        old: 'import { getNewestSneakers } from "@/lib/data-service";',
        new: 'import { getNewestSneakers } from "@/services/sneakers-service";',
      },
    ],
  },
  {
    path: "app/(products)/sneakers/nav/sales/page.js",
    replacements: [
      {
        old: 'import { getSneakersOnSale } from "@/lib/data-service";',
        new: 'import { getSneakersOnSale } from "@/services/sneakers-service";',
      },
    ],
  },
  {
    path: "app/(products)/sneakers/nav/[category]/page.js",
    replacements: [
      {
        old: 'import { getSneakers } from "@/lib/data-service";',
        new: 'import { getSneakers } from "@/services/sneakers-service";',
      },
    ],
  },
  {
    path: "app/_components/account/addresses/AdressModal.js",
    replacements: [
      {
        old: 'import { removeUserAddress, upsertUserAdress } from "@/lib/data-service";',
        new: 'import { removeUserAddress, upsertUserAdress } from "@/actions/address-action";',
      },
    ],
  },
  {
    path: "app/(products)/favorites/page.js",
    replacements: [
      {
        old: 'import { getFavorites } from "@/lib/data-service";',
        new: 'import { getFavorites } from "@/services/favorite-service";',
      },
    ],
  },
  {
    path: "app/(products)/sneaker/[slug]/page.js",
    replacements: [
      {
        old: 'import { getSneaker, getSneakersReviews } from "@/lib/data-service";',
        new: 'import { getSneaker } from "@/services/sneakers-service";\nimport { getSneakersReviews } from "@/services/reviews-service";',
      },
    ],
  },
  {
    path: "app/(cart-checkout)/cart/page.js",
    replacements: [
      {
        old: 'import { getUserAddresses } from "@/lib/data-service";',
        new: 'import { getUserAddresses } from "@/services/address-service";',
      },
    ],
  },
  {
    path: "app/account/profile/page.js",
    replacements: [
      {
        old: 'import { getUser } from "@/lib/data-service";',
        new: 'import { getUser } from "@/services/users-service";',
      },
    ],
  },
  {
    path: "app/(cart-checkout)/checkout/page.js",
    replacements: [
      {
        old: 'import { getUserAddresses } from "@/lib/data-service";',
        new: 'import { getUserAddresses } from "@/services/address-service";',
      },
    ],
  },
  {
    path: "app/account/addresses/page.js",
    replacements: [
      {
        old: 'import { getUserAddresses } from "@/lib/data-service";',
        new: 'import { getUserAddresses } from "@/services/address-service";',
      },
    ],
  },
  {
    path: "app/account/orders/page.js",
    replacements: [
      {
        old: 'import { getOrders, getUserReviews } from "@/lib/data-service";',
        new: 'import { getOrders } from "@/services/orders-service";\nimport { getUserReviews } from "@/services/reviews-service";',
      },
    ],
  },
  {
    path: "app/account/orders/item/[order_id]/page.js",
    replacements: [
      {
        old: 'import { getOrderItems } from "../../../../../lib/data-service";',
        new: 'import { getOrderItems } from "@/services/orders-service";',
      },
    ],
  },
  {
    path: "lib/auth.js",
    replacements: [
      {
        old: 'import { createUser, getUser } from "./data-service";',
        new: 'import { createUser, getUser } from "@/services/users-service";',
      },
    ],
  },
];

const rootDir = process.cwd();
let successCount = 0;
let errorCount = 0;

updates.forEach(({ path: filePath, replacements }) => {
  const fullPath = `${rootDir}/${filePath}`;

  try {
    let content = fs.readFileSync(fullPath, "utf-8");
    let updated = false;

    replacements.forEach(({ old, new: newContent }) => {
      if (content.includes(old)) {
        content = content.replace(old, newContent);
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`✓ Updated: ${filePath}`);
      successCount++;
    } else {
      console.log(`⚠ No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
    errorCount++;
  }
});

console.log(`\n✓ Successfully updated: ${successCount} files`);
if (errorCount > 0) {
  console.log(`✗ Errors: ${errorCount} files`);
}
