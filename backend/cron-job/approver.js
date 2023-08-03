const ProductModel = require("../models/product.model")

const approver = async () => {
    console.log("Approver Job Started!")
    let data = await ProductModel.find({ approved: false },{_id:1});
    let product=0
    let job=setInterval(async () => {
        let pid=data[product]._id
        await ProductModel.findByIdAndUpdate(pid,{approved:true})
        console.log(`A Product ${pid} has been approved.`)
        product++
        if(product==data.length){
            console.log("Approver Job Completed!")
            clearInterval(job)
        }
    }, 1000 * 5)
}

module.exports = {
    approver
}