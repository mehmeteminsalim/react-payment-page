import React, { useEffect, useRef, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcDiscover } from "react-icons/fa";

let masterCard = ["51", "52", "53", "54", "55", "222100-272099"];
let visa = ["4"];
let discover = [
  "6011",
  "622126",
  "622925",
  "644",
  "645",
  "646",
  "647",
  "648",
  "649",
  "65",
];

const index = () => {
  const [isCvcFocus, setIsCvcFocus] = useState(false);
  const [cardNumberValue, setCardNumberValue] = useState("");
  const [expire, setExpire] = useState("");
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [icon, setIcon] = useState();
  const ref = useRef();

  const cardNumberValidator = (e) => {
    let value = e.target.value;
    value = value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    masterCard.forEach((element) => {
      if (value.startsWith(element, 0)) {
        setIcon(<FaCcMastercard size="2em" />);
        return false;
      }
    });

    visa.forEach((element) => {
      if (value.startsWith(element, 0)) {
        setIcon(<FaCcVisa size="2em" />);
        return false;
      }
    });

    discover.forEach((element) => {
      if (value.startsWith(element, 0)) {
        setIcon(<FaCcDiscover size="2em" />);
        return false;
      }
    });

    setCardNumberValue(value);
  };

  const expireValidator = (e) => {
    let value = e.target.value;
    value = value
      .replace(/^([1-9]\/|[2-9])$/g, "0$1/")
      .replace(/^(0[1-9]|1[0-2])$/g, "$1/")
      .replace(/^([0-1])([3-9])$/g, "0$1/$2")
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2")
      .replace(/^([0]+)\/|[0]+$/g, "0")
      .replace(/[^\d\/]|^[\/]*$/g, "")
      .replace(/\/\//g, "/")
      .trim();
    setExpire(value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      // console.log(concernedElement, e.target);
      if (ref.current.contains(e.target)) {
        console.log("clicked inside");
      } else {
        setIsCvcFocus(false);
      }
    });
  }, []);

  return (
    <>
      {console.log(cardNumberValue)}

      <div className="bg-[#F7FAFC] w-full h-screen flex flex-col items-center justify-center z-0">
        <div className="container">
          <h1 className="text-4xl mb-12 text-center">Payment Page</h1>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className=" px-6">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4">
                <div className="flex flex-col col-span-2">
                  <label
                    className="mb-2 text-[#4F5B76] font-semibold"
                    htmlFor="user-name"
                  >
                    Name
                  </label>
                  <input
                    className="border-2 border-[#E0E0E0] h-11 rounded-md focus:border-[#8b8b8b] outline-none px-3"
                    type="text"
                    id="user-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                    onFocus={() => setIsCvcFocus(false)}
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label
                    className="mb-2 text-[#4F5B76] font-semibold"
                    htmlFor="card-number"
                  >
                    Card Number
                  </label>
                  <input
                    className="border-2 border-[#E0E0E0] h-11 rounded-md focus:border-[#8b8b8b] outline-none px-3"
                    type="text"
                    id="card-number"
                    placeholder="1234 **** **** ****"
                    maxLength="19"
                    value={cardNumberValue}
                    onChange={cardNumberValidator}
                    onFocus={() => setIsCvcFocus(false)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-[#4F5B76] font-semibold"
                    htmlFor="expiry"
                  >
                    Expiry
                  </label>
                  <input
                    className="border-2 border-[#E0E0E0] h-11 rounded-md focus:border-[#8b8b8b] outline-none px-3"
                    type="text"
                    id="expiry"
                    placeholder="MM / YY"
                    onFocus={() => setIsCvcFocus(false)}
                    value={expire}
                    onChange={expireValidator}
                    ref={ref}
                    maxLength={5}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="mb-2 text-[#4F5B76] font-semibold"
                    htmlFor="cvc"
                  >
                    CVC
                  </label>
                  <input
                    className="border-2 border-[#E0E0E0] h-11 rounded-md focus:border-[#8b8b8b] outline-none px-3"
                    type="text"
                    id="cvc"
                    placeholder="CVC"
                    onClick={() => setIsCvcFocus(true)}
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className=" flex items-center justify-center md:justify-around px-0.5">
              {isCvcFocus ? (
                <div className="w-96 h-52 bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-2xl ">
                  <div className="grid grid-cols-1 text-white h-full p-4 relative">
                    <div className="absolute w-full h-10 bg-black top-6 "></div>
                    <div></div>
                    <div></div>
                    <div className="top-10 w-full ">
                      <div className="relative w-full h-10 flex justify-start items-center">
                        <div className="absolute w-full h-7 bg-white z-40 rounded flex justify-end items-center">
                          <div className="text-black px-4 font-semibold">
                            {cvc != "" ? cvc : "123"}
                          </div>
                        </div>
                        <div className="absolute w-4/5 h-9 bg-gray-600 z-50 rounded"></div>
                      </div>
                    </div>
                    <div className=" animate-pulse">
                      <div className="w-3/4 h-1 rounded mb-1  bg-gray-200"></div>
                      <div className="w-2/3 h-1 rounded mb-1 bg-gray-200"></div>
                      <div className="w-1/3 h-1 rounded mb-1 bg-gray-200"></div>
                      <div className="w-4/5 h-1 rounded mb-1 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-96 h-52 bg-gradient-to-tl from-gray-700 via-gray-900 to-black rounded-2xl ">
                  <div className="grid grid-cols-2 gap-4 text-white h-full p-4 relative">
                    <div>Credit Card</div>
                    <div className="flex items-start justify-end">{icon}</div>
                    <div className="col-span-2 flex flex-col justify-end">
                      <div className="flex items-end">
                        {name != "" ? name.toUpperCase() : "John Doe"}
                      </div>
                      <div className="flex justify-between">
                        <div className="">
                          {cardNumberValue != ""
                            ? cardNumberValue
                            : "1234 **** **** ****"}
                        </div>
                        <div className="">
                          {expire != "" ? expire : "MM / YY"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-lg mt-24 text-center">
            Created by{" "}
            <a
              className="underline text-indigo-600"
              href="https://github.com/mehmeteminsalim"
            >
              Mehmet Emin Salim
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
