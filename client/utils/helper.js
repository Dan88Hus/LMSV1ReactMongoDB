//data { currency: "", amount: ""}

export const currentFormatter = data => {
    return(
        (data.amount*100/100).toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency,
        })
    )
}

export const stripeCurrentFormatter = data => {
    return(
        (data.amount/100).toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency,
        })
    )
}