import { TextArea, TextInput } from '@/components/Inputs/Inputs';
import { IconButton, LinkButton } from '@/components/buttons/buttons';
import styles from '@/styles/newproduct.module.css'
const NewProductPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.headerbtn}>
                    <LinkButton href="/" title='Dashboard' />
                </div>
            </div>


            <div className={styles.pageTitle}>
                <div className={styles.headerGrp}>
                    <IconButton
                        bgColor={"#f5f7f9"}
                        padding={"0px 10px"}
                        leftIcon={<i style={{ color: "#000" }} class="fi fi-rr-arrow-small-left"></i>} width={"fit-content"} />
                    <div className={styles.textGrp}>
                        <div className={styles.topTxt}>
                            <p>Back to product list</p>
                        </div>
                        <div className={styles.bottomTxt}>
                            <p>Add New Product</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.addProduct}>
                <div className={styles.col1}>
                    <p>Description</p>
                    <div className={styles.prodDes}>
                        <div className={styles.innerProdNameInput}>
                            <TextInput label={"Product name"} placeholder={"Product name"} />
                        </div>

                        <div className={styles.innerProdDescInput}>
                            <TextArea label={"Description"} placeholder={"Description"} />
                        </div>
                    </div>
                </div>
                <div className={styles.col2}><p>oooottt</p></div>
            </div>
        </div>
    )
}

export default NewProductPage;