import styles from "@/styles/verticalProductListing.module.css"
import Image from "next/image";


const ProductVerticalListing = (props)=>{
    return (
        <div className={styles.singleProductList}>
        <div className={styles.productInfo}>
          <div className={styles.img}>
            <Image src={props.img} width={500} height={500} />
          </div>
          <div className={styles.productMeta}>
            <p>{props.productName}</p>
            <p>plant</p>
            <p>#{props.sku}</p>
          </div>
        </div>
        <div className={styles.productPrice}>
          <p>Rs {props.price}</p>
        </div>
        <div className={styles.productInventory}>
          <p>{props.stock}</p>
        </div>
        <div className={styles.productWeight}>
          <p>{props.weight} kg</p>
        </div>
        <div className={styles.productDate}>
          <p>{props.date}</p>
        </div>
        <div className={styles.productStatus}>

          <div className={[styles.productStockStatusInner,props.status!='Published' && styles.lowStock].join(" ")}>
            <p>{props.status}</p>
          </div>

          <div className={styles.moreoptions}>
            <i class="fi fi-bs-menu-dots"></i>
          </div>
        </div>

      </div>
    )
}

export default ProductVerticalListing;