import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomProfileImage(): string {
  const profileImages = [
    "/profile-images/936378.jpg",
    "/profile-images/Eart.jpeg",
    "/profile-images/jongsun-lee-F-pSZO_jeE8-unsplash.jpg",
    "/profile-images/nasa-NuE8Nu3otjo-unsplash.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * profileImages.length);
  return profileImages[randomIndex];
}
