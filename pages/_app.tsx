import AddEventContextProvider from "@/context/add-event-context";
import DeliveriesContextProvider from "@/context/deliveries-context";
import PlanContextProvider from "@/context/plan-context";
import PlansContextProvider from "@/context/plans-context";
import SlotCountContextProvider from "@/context/slot-count-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AddEventContextProvider>
      <PlansContextProvider>
        <PlanContextProvider>
          <SlotCountContextProvider>
            <DeliveriesContextProvider>
              <Component {...pageProps} />
            </DeliveriesContextProvider>
          </SlotCountContextProvider>
        </PlanContextProvider>
      </PlansContextProvider>
    </AddEventContextProvider>
  );
}
