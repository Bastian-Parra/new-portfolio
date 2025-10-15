import { PrimeReactProvider } from "primereact/api";

export default function Provider({ children }) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
