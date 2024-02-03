import { IconInput, TextArea, TextInput } from "@/components/Inputs/Inputs";
import { Button, IconButton, LinkButton } from "@/components/buttons/buttons";
import styles from "@/styles/newproduct.module.css";
import { generateImageUsingAI } from "@/utils/ai/generate/image";
import { generateProductDescriptionUsingAI } from "@/utils/ai/generate/productDescription";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const CustomCircularLoading = () => (
    <ClipLoader
        size={15}
        cssOverride={{
            position: "relative",
            top: "1px",
            marginLeft: "10px"
        }}
        color="var(--primary)"
    />
);

const NewProductPage = () => {
    const [productname, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [prodCat, setProdCat] = useState("");
    const [aiGeneratedImgs, setAiGeneratedImgs] = useState();
    const [loading, setLoading] = useState({
        aiImages: false,
        aiDescription: false
    });

    const router = useRouter();

    const handleAddProduct = async () => {
        console.log(true);
    };

    const generateImages = async () => {
        setLoading((prev) => ({ ...prev, aiImages: true }));
        const data = await generateImageUsingAI(productname);
        const response = data.data;
        setLoading((prev) => ({ ...prev, aiImages: false }));
        setAiGeneratedImgs(response);
    };

    const generateDescription = async () => {
        setLoading((prev) => ({ ...prev, aiDescription: true }));
        const data = await generateProductDescriptionUsingAI(productname);
        console.log(data);
        // setDescription(data.response.choices[0].message.content);
        setLoading((prev) => ({ ...prev, aiDescription: false }));
        // console.log(data.response.choices[0].message.content);
    };

    console.log(loading);

    return (
        <div className={styles.main}>
            {/* <div className={styles.header}>
        <div className={styles.headerbtn}>
          <LinkButton
            padding="10px 15px"
            bg={"transparent"}
            color="var(--black)"
            href="/"
            title="Dashboard"
            sx={{border: "2px solid var(--borderGrey)"}}
          />
        </div>
      </div> */}

            <div className={styles.pageTitle}>
                <div className={styles.headerGrp}>
                    <IconButton
                        onClick={generateImages}
                        bgColor={"#f5f7f9"}
                        padding={"0px 10px"}
                        leftIcon={
                            <i
                                style={{ color: "#000" }}
                                class="fi fi-rr-arrow-small-left"></i>
                        }
                        width={"fit-content"}
                    />
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
                    <div>
                        <p className={styles.title}>Description</p>
                        <div className={styles.prodDes}>
                            <div className={styles.innerProdNameInput}>
                                <TextInput
                                    setText={(e) => setProductName(e.target.value)}
                                    label={"Product name"}
                                    placeholder={"Product name"}
                                />
                            </div>
                            <div
                                style={{ position: "relative" }}
                                className={styles.innerProdDescInput}>
                                <TextArea
                                    setText={(e) => setDescription(e.target.value)}
                                    label={"Description"}
                                    placeholder={"Description"}
                                    value={description}
                                />
                                {/* <span
                                    style={{
                                        color: "var(--primary)",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        marginLeft: "5px",
                                        position: "absolute",
                                        top: 0,
                                        right: 0
                                    }}>
                                    {!loading.aiDescription ? (
                                        <p onClick={() => generateDescription()}>Generate using AI</p>
                                    ) : (
                                        <p>
                                            Generating, Hold on! <CustomCircularLoading />
                                        </p>
                                    )}
                                </span> */}
                            </div>
                        </div>
                    </div>

                    <div className={styles.prodCatArea}>
                        <p className={styles.title}>Category</p>
                        <div className={styles.prodCat}>
                            <div className={styles.innerProdInput}>
                                <TextInput
                                    setText={(e) => setProdCat(e.target.value)}
                                    label={"Product Category"}
                                    placeholder={"Health and Medicine"}
                                />
                            </div>
                            <div className={styles.innerProdInput}>
                                <TextInput
                                    label={"Product Category"}
                                    placeholder={"Beauty"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.inventory}>
                        <p className={styles.title}>Inventory</p>
                        <div className={styles.inventoryinfo}>
                            <div className={styles.quantity}>
                                <TextInput
                                    setText={(e) => console.log(e.target.value)}
                                    label={"Quantity"}
                                    placeholder={1020}
                                />
                            </div>
                            <div className={styles.sku}>
                                <TextInput
                                    setText={(e) => console.log(e.target.value)}
                                    label={"SKU"}
                                    placeholder={"uu-br-br-05"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                        className={styles.title}>
                        <span>Product Images</span>{" "}
                        {/* <span
                            style={{
                                color: "var(--primary)",
                                cursor: "pointer",
                                marginLeft: "5px"
                            }}>
                            {!loading.aiImages ? (
                                <span onClick={() => generateImages()}>Generate using AI</span>
                            ) : (
                                <span>
                                    Generating, Hold on
                                    <CustomCircularLoading />
                                </span>
                            )}
                        </span> */}
                    </div>
                    <div className={[styles.productimg, !aiGeneratedImgs && styles.height166].join(" ")}>
                        <div className={styles.grid1}>
                            <div className={styles.innergrid}>
                                {aiGeneratedImgs ? (
                                    <img
                                        style={{ width: "100%", objectFit: "cover" }}
                                        src={aiGeneratedImgs[0].url}
                                        alt=""
                                    />
                                ) : (
                                    <i class="fi fi-rr-images"></i>
                                )}
                            </div>
                        </div>
                        <div className={styles.grid2}>
                            <div className={styles.innergrid}>
                                {aiGeneratedImgs ? (
                                    <img
                                        style={{ width: "100%", objectFit: "cover" }}
                                        src={aiGeneratedImgs[1].url}
                                        alt=""
                                    />
                                ) : (
                                    <i class="fi fi-rr-images"></i>
                                )}
                            </div>
                        </div>
                        <div className={styles.grid3}>
                            <div className={styles.innergrid}>
                                {aiGeneratedImgs ? (
                                    <img
                                        style={{ width: "100%", objectFit: "cover" }}
                                        src={aiGeneratedImgs[2].url}
                                        alt=""
                                    />
                                ) : (
                                    <i class="fi fi-rr-images"></i>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className={styles.title}>Shipping and delivery</p>
                    <div className={styles.shippingdelivery}>
                        <div className={styles.itemWeight}>
                            <IconInput
                                label={"Plant weight"}
                                placeholder={12.0}
                                rightIcon={<p>k g</p>}
                            />
                        </div>
                        <div className={styles.plantSize}>
                            <IconInput
                                label={"Height"}
                                placeholder={12}
                                rightIcon={<p>ft</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                            <IconInput
                                label={"Plant Spread"}
                                placeholder={12}
                                rightIcon={<p>cm</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                            <IconInput
                                label={"Maximum Height"}
                                placeholder={12}
                                rightIcon={<p>ft</p>}
                                rightIconCSS={{ paddingRight: "5px" }}
                            />
                        </div>
                    </div>
                    <p className={styles.title}>Pricing</p>
                    <div className={styles.pricing}>
                        <IconInput
                            label={"Pricing"}
                            placeholder={345}
                            leftIcon={<p>₹</p>}
                            leftIconCSS={{
                                position: "absolute",
                                top: "62%",
                                left: "7%"
                            }}
                        />
                        <IconInput
                            label={"Compare at price"}
                            placeholder={555}
                            leftIcon={<p>₹</p>}
                            leftIconCSS={{
                                position: "absolute",
                                top: "62%",
                                left: "7%"
                            }}
                        />
                    </div>
                    <div className={styles.callToactions}>
                        <Button
                            padding={"10px"}
                            width={"25%"}
                            title="Discard"
                            onClick={() => router.push("/products")}
                        />
                        <Button
                            onClick={() => handleAddProduct()}
                            bg="var(--primary)"
                            color={"var(--white)"}
                            padding={"10px"}
                            width={"25%"}
                            title="Add product"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductPage;

export const getServerSideProps = async (ctx) => {
    try {
        const myCookie = ctx.req?.cookies || "";
        const res = await adminVerification(myCookie.token);
        console.log(res);
        if (res.code === 0) {
            return {
                redirect: {
                    destination: "/login?redirectTo=/products/new",
                    permanent: false
                }
            };
        }
        return {
            props: {
                isLogin: true
            }
        };
    } catch (err) {
        // console.log(err)
        return {
            redirect: {
                destination: "/login?redirectTo=/products/new",
                permanent: false
            }
        };
    }
};
