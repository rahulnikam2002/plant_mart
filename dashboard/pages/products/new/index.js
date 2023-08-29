import { IconButton, LinkButton } from '@/components/buttons/buttons';
import styles from '@/styles/newproduct.module.css'
const NewProductPage = ()=>{
    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.headerbtn}>
                    <LinkButton  href="/" title='Dashboard'/>
                </div>
            </div>
            <div className={styles.pageTitle}>
                <div className={styles.headerGrp}>
                    <IconButton
                    bgColor={"#f5f7f9"}
                     leftIcon={<i class="fi fi-rr-arrow-small-left"></i>} width={"fit-content"} />
                </div>
            </div>
        </div>
    )
}

export default NewProductPage;