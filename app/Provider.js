"use client"; // This ensures Redux works in Next.js

import { Provider } from "react-redux";
import store from "../store"; // Adjust path if needed

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
