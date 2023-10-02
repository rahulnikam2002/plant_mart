
import { IconButton } from "@/components/buttons/buttons";
import styles from "@/styles/verticalCategoryListing.module.css"

const CategoryVerticalListing = (props) => {
    return (
        <div className={styles.singleCategoryList}>
            <div className={styles.catName}>
                <p>{props.categoryName}</p>
            </div>
            <div className={styles.prodCat}>
                <p><span>{props.product}</span> products</p>
            </div>
            <div className={styles.catStatus}>
            <div className={[styles.productStockStatusInner,props.status!='Active' && styles.lowStock].join(" ")}>
            <p>{props.status}</p>
          </div>
            </div>
            <div className={styles.active}>
                <IconButton
                    onClick={() => {
                        router.push("/products/new");
                    }}
                    leftIcon={
                        <i
                            style={{ color: "var(--white)" }}
                            class="fi fi-rr-file-edit"></i>
                    }
                    title={"Edit"}
                    width={"fit-content"}
                    padding={"10px"}
                />
                <div className={styles.deleteOption}>
                <IconButton
                           
                            width={"fit-content"}
                            rightIcon={
                                <i
                                    style={{ color: "var(--secondary)" }}
                                    class="fi fi-rr-trash"></i>
                            }
                            sx={{ color: "var(--primary)" }}
                            bgColor={"#f5f7f9"}
                           
                            
                        />
                </div>
            </div>
        </div>
    )
}

export default CategoryVerticalListing;