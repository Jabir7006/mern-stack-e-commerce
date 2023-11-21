import React from "react";
import { FaCcAmazonPay, FaShippingFast } from "react-icons/fa";
import { MdDiscount, MdSupportAgent } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Features = () => {

    const features = [
        {
            icon: <FaShippingFast size={38} className="text-orange-400"/>,
            title: "Free Shipping",
            description: "Free Shipping Over $100",
        },
        {
            icon: <RiMoneyDollarCircleFill size={38} className="text-orange-400"/> ,
            title: "Money Guarantee",
            description: "30 Days Money Back Guarantee",
        },
        {
          icon : <MdSupportAgent size={38} className="text-orange-400"/>,
          title: "24/7 Support",
          description: "Dedicated 24/7 Support Team",
        },
        {
         icon : <FaCcAmazonPay size={38} className="text-orange-400"/>,
         title: "Secure Payment",
         description: "100% Secure Payment",
        },
        {
            icon : <MdDiscount size={38} className="text-orange-400"/>,
            title : "Member Discount",
            description : "10% Member Discount on First Purchase",
        },

    ]

    const featureImg = [
        {
            img1 : "https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-1.jpg"
        },
        {
            img2 : "https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-2.jpg"
        },
        {
            img3 : "https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-3.jpg"
        },
    ]

  return (
    <div className="py-8">
      <div className="border border-gray-300 rounded p-2">
       
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {" "}
         
         {
            features.map((feature, i) => {
                return (
                    <div className="px-6 py-3" key={i}>
                    {" "}
                    <div className="rounded-full w-16 h-16 flex justify-center items-center shadow-2xl">
                      {" "}
                      {feature.icon}
                    </div>{" "}
                    <h2 className="uppercase mt-2 text-[.96rem] font-medium mb-2">
                      {" "}
                      {feature.title}
                    </h2>{" "}
                    <p className="text-sm text-[#666B70] mb-2">
                      {" "}
                      {feature.description}
                    </p>{" "}
                   
                  </div>
                )
            })
         }
          
          
        </div>
      </div>


         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {
                featureImg.map((img, i) => {
                    return (
                        <div key={i} className="flex justify-between items-center w-auto">
                           <Link to="/store">
                           <img src={img.img1} alt="" />
                           </Link>
                             <Link to={"/store"}>
                             <img src={img.img2} alt="" />
                             </Link>
                             <Link to={"/store"}>
                             <img src={img.img3} alt="" />
                             </Link>
                        </div>
                    )
                })
            }
         </div>
       
    </div>
  );
};

export default Features;
