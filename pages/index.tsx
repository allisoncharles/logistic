import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { getDeliveries } from "@/lib/deliveries";
import { getPlans } from "@/lib/plans";
import { DeliveriesType, PlansType } from "@/types";
import Navbar from "@/components/navbar";
import QueueWrapper from "@/components/queue-wrapper";
import Footer from "@/components/footer";

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

type HomePropType = {
  deliveriesRes: DeliveriesType;
  plansRes: PlansType;
};

export default function Home({ deliveriesRes, plansRes }: HomePropType) {

  return (
    <div className={`${roboto.className} ${styles.home}`}>
      <Navbar />
      <main className={styles.main}>
        <>
          <h2 className={styles.home__title}>Transportation Queue</h2>
          <QueueWrapper deliveries={deliveriesRes} plans={plansRes} />
        </>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [deliveriesRes, plansRes] = await Promise.all([
    await getDeliveries(),
    await getPlans(),
  ]);

  return {
    props: {
      deliveriesRes,
      plansRes,
    },
  };
}
