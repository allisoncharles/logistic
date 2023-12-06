"use client";
import styles from "../styles/deliveries.module.css";
import DeliveryTable from "./delivery-table";
import Pagination from "./pagination";
import { useState, useContext } from "react";
import { DeliveriesContext } from "@/context/deliveries-context";

const Deliveries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const { deliveries } = useContext(DeliveriesContext);

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  const currentRecords = deliveries?.slice(
    indexOfFirstRecord,
    indexedOfLastRecord
  );

  const nPages = Math.ceil(deliveries?.length / recordsPerPage);
  return (
    <div className={styles.deliveries}>
      <h3 className={styles.deliveries__title}>Delivery Queue</h3>

      {deliveries?.length ? (
        <>
          <div className={styles.deliveries__table__wrapper}>
            <DeliveryTable deliveriesData={currentRecords} />
            <p className={styles.deliveries__table__padding}></p>
          </div>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <p className={styles.deliveries__empty}>No Deliveries.</p>
      )}
    </div>
  );
};

export default Deliveries;
