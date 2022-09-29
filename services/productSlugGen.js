const productSlugGen = (values) => {

    const slug = values.p_sub_collection
        ? `${values.p_collection}-${values.p_sub_collection}-${values.p_title}`
        : `${values.p_collection}-${values.p_title}`

    return slug.replaceAll(' ', '')
}

const productSlugDegen = (values) => {
    let obj

    if (values.length === 3) {
        obj = {
            p_collection: values[0],
            p_sub_collection: values[1],
            p_title: values[2]
        }
        return obj
    }
    obj = {
        p_collection: values[0],
        p_sub_collection: '',
        p_title: values[1]
    }
    return obj
}

export { productSlugGen, productSlugDegen }