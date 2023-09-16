
let main=document.getElementById("main_container");
let price=document.getElementById("price");
let total_amt=document.getElementById("total_amt");
let token=JSON.parse(localStorage.getItem("token"));
let cartdata=JSON.parse(localStorage.getItem("cartdata")) || [];
let totalitems=0;
let item_count=document.getElementById("item_count");
let checkout=document.getElementById("checkout_btn");
let paypalbtn=document.getElementById("paypal_pay_btn");

const baseUrl="https://ctshirt.onrender.com";

window.addEventListener("load",()=>{
    fetchdata();
})

function fetchdata(){
    fetch(`${baseUrl}/cart`,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "authorization":`Bearer ${token}`
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        if(data.err){
            alert("please login first");
            window.location.href="../login_signip.html";

        }else{
            totalitems=data.data.length;
            showData(data.data);
        }
         
    })
};

function showData(data){
    main.innerHTML=null;
    let cartprice=0;
    data.forEach(element => {
        cartprice+=element.price;
        
        let card=document.createElement("div");
        card.setAttribute("class","card");

        let div1=document.createElement("div");
        div1.setAttribute("class","title_div");

        let h4=document.createElement("h4");
        h4.setAttribute("class","title");
        h4.innerText=element.title;

        let remove=document.createElement("button");
        remove.setAttribute("id","remove_btn");
        remove.innerText="X";

        remove.addEventListener("click",()=>{
            
            fetch(`${baseUrl}/cart/${element._id}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                fetchdata();
            })
        })

        div1.append(h4,remove);
        card.append(div1);

        let div2=document.createElement("div");
        div2.setAttribute("class","details_div");

        let div3=document.createElement("div");
        div3.setAttribute("class","img_div");

        let img=document.createElement("img");
        img.setAttribute("class","product_img");
        img.src=element.img;

        div3.append(img);
        div2.append(div3);

        let div4=document.createElement("div");
        div4.setAttribute("class","right_div");

        let div5=document.createElement("div");
        div5.setAttribute("class","sub_div");

        let p1=document.createElement("p");
        p1.innerText=`${element.fit}  ${element.size} (inches)`;

        let p2=document.createElement("p");
        p2.innerText=`$${element.price}`;

        div5.append(p1,p2);
        div4.append(div5);
        div2.append(div4);

        let h5=document.createElement("h5");
        h5.innerText="QUANTITY";

        div4.append(h5);

        let div6=document.createElement("div");
        div6.setAttribute("class","quantity_main_div");

        let div7=document.createElement("div");
        div7.setAttribute("class","quantity_div");

        let plusbtn=document.createElement("button");
        plusbtn.setAttribute("id","plus_btn");
        plusbtn.innerText="+";

        let qt=document.createElement("p");
        qt.setAttribute("id","items_quantity");
        qt.innerText=1;

        let minusbtn=document.createElement("button");
        minusbtn.setAttribute("id","minus_btn");
        minusbtn.innerText="-";

        div7.append(plusbtn,qt,minusbtn);
        div6.append(div7);
        div4.append(div6)

        let totalprice=document.createElement("h4");
        totalprice.setAttribute("id","totalprice");
        totalprice.innerText=`$${element.price}`;

        div6.append(totalprice);

        let btndiv=document.createElement("div");
        btndiv.setAttribute("class","bybtndiv");

        let buybtn=document.createElement("button");
        buybtn.innerText="BUY NOW";
        buybtn.setAttribute("class","buyitembtn");

        buybtn.addEventListener("click",()=>{
            alert("make payment page and create placed order route");
        })

        btndiv.append(buybtn);
        div4.append(btndiv);

        card.append(div1,div2);
        main.append(card);



    });
    price.innerText=cartprice;
    if(totalitems==0){
        total_amt.innerText=0;
    }else{
        total_amt.innerText=cartprice+17.95;
    }
    
    item_count.innerText=`YOUR ITEMS (${totalitems})`;

};

checkout.addEventListener("click",()=>{
    if(totalitems>0){
        alert("ORDER PLACED");
        window.location.href="../index.html";
    }
});

paypalbtn.addEventListener("click",()=>{
    if(totalitems>0){
        alert("ORDER PLACED");
        window.location.href="../index.html";
    }
})