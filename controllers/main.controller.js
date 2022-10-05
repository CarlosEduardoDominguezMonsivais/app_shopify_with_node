'use strict';
const request = require("request");

function priceWithIVA(valueTypeBox, alto, largo, ancho) {
    var price_with_iva = ((((((largo * 10)* 2) + 10) + (((((ancho*10)*2)+6))+35)) * (((((alto*10)+9)+((alto*10)+8))/1000000) * valueTypeBox)) * 1.16);
    return `$ ${price_with_iva.toFixed(2)}`
}

function priceWithoutIVA(valueTypeBox, alto, largo, ancho) {
    var price_without_iva = (((((largo * 10)* 2) + 10) + (((((ancho*10)*2)+6))+35)) * (((((alto*10)+9)+((alto*10)+8))/1000000) * valueTypeBox));
    return `$ ${price_without_iva.toFixed(2)}`
}

function squareArea(alto, largo, ancho) {
    var square_area =(((((largo * 10)* 2) + 10) + (((((ancho*10)*2)+6))+35)) * ((((alto*10)+9)+((alto*10)+8)))/1000000);
    return `${square_area} m2`
}

class MainController {
    index(_req, res) {
        request.get("https://a291f40bc9380298f175a288fd77f2d2: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@test-parapaquetes-app.myshopify.com/admin/products/6851868459087.json",(err, response, body)=> {
            if (!err){
                const {product} = JSON.parse(body);
                res.render("product", { 
                    product
                });
            }
        })
    }

    createProduct(req, res) {
        console.log(req.body);
        const { type_box, alto, largo, ancho } = req.body;
        let valueTypeBox;
        switch (type_box) {
            case '26_ects_C': 
                valueTypeBox = 16.41;
            break;
            case '32_ects_C': 
                valueTypeBox= 19.11;
            break;
            case '36_ects_BC': 
                valueTypeBox= 23.54;
            break;
            case '48_ects_BC': 
                valueTypeBox= 28.18;
            break;
            case '61_ects_BC': 
                valueTypeBox= 34.88;
            break;
        }

        const orderProduct = {
            type_box, 
            valueTypeBox,
            alto, 
            largo,
            ancho,
            precio_con_iva: priceWithIVA(valueTypeBox, parseFloat(alto), parseFloat(largo), parseFloat(ancho)),
            precio_sin_iva: priceWithoutIVA(valueTypeBox, parseFloat(alto), parseFloat(largo), parseFloat(ancho)),
            area: squareArea(parseFloat(alto), parseFloat(largo), parseFloat(ancho))
        }

        res.status(200).send({             
            orderProduct
        })     
    }
}

module.exports = new MainController();