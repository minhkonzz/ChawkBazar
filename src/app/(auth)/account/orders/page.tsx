import { getUserOrders } from "@/lib/firebase/firestore/order";
import { isEmptyArray } from "@/shared/helpers/array";
import { OrderListItem } from "@/shared/types";
import { getFirestore } from "firebase/firestore";
import styles from "./page.module.css";
import getAuthenticatedAppForUser from "@/lib/firebase/server";

const _mockTableHead = [
   "Order",
   "Date",
   "Status",
   "Total",
   "Actions" 
];

export default async function AccountOrders() {
   const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();

   if (!currentUser) 
      return <p>Not found current user</p>

   const firestoreServer = getFirestore(firebaseServerApp);
   const orders = await getUserOrders(currentUser.uid, firestoreServer);

   return (
      !isEmptyArray(orders) && 
      <table className="w-100pc">
         <thead className={styles.thead}>
            <tr>
               {_mockTableHead.map((e, i: number) => 
                  <th key={i} className={styles.th}>{e}</th>
               )}
            </tr>
         </thead>
         <tbody className={styles.tbody}>
            {orders.map((e: OrderListItem, i: number) => {
               const values = [
                  e.date,
                  e.state,
                  `$${e.total} for ${e.totalItems} items`
               ];
               return (
                  <tr key={i} className={styles.row}>
                     <td className={styles.cell}>#{i+1}</td>
                     {values.map((v: string, _i: number) => <td key={_i} className={styles.cell}>{v}</td>)}
                     <td className={styles.cell}>
                        <button className={styles.button}>View</button>
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </table> ||
      <p>No data found</p>
   );
};