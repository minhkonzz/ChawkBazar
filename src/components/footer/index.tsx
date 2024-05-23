import styles from "./styles.module.css";
import { mock } from "./mock";

export default function () {
   return (
      <footer className={`${styles.container} mx-auto`}>
         <div className={styles.sections}>
            { mock.map((e, i) => (
               <div className={styles.section}>
                  <h4 className={styles.title}>{e.title}</h4>
                  <ul className={styles.list}>
                     { e.references.map((ref, _i) => (
                        <li key={ref.id}><a className={styles.link} href="#">{ref.title}</a></li>
                     )) }
                  </ul>
               </div>
            )) }
         </div>
         <div className={styles.bottom}>
            
         </div>
      </footer>
   )
}