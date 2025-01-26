import { createContext } from "react";
import { StoredReceipt } from "../../types";

const AppContext = createContext({
  currentReceipt: null as StoredReceipt | null,
  setCurrentReceipt: (() => {}) as React.Dispatch<StoredReceipt | null>,
  lastUpdated: 0,
  setLastUpdated: (() => {}) as React.Dispatch<number>,
})

export default AppContext;
