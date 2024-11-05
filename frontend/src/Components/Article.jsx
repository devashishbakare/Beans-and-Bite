import React, { useEffect } from "react";
import { History } from "./History";
import { useDispatch } from "react-redux";
import { articleData } from "../utils/DisplayData";
import { addFromNavbar, resetHistory } from "../redux/slices/historySlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
export const Article = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const updateHistory = () => {
      dispatch(resetHistory());
      dispatch(addFromNavbar({ sectionName: "Article" }));
    };
    updateHistory();
  }, []);

  const handleOrderCoffee = () => {
    dispatch(
      updateNavbarOptionSelection({
        option: "Order",
        extraData: { currSelectedOption: "Coffee At Home" },
      })
    );
  };

  const handleViewArticle = (article) => {
    dispatch(
      updateNavbarOptionSelection({ option: "articleView", extraData: article })
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-auto w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px] theamColor">
          <History />
        </div>
      </div>

      <div className="h-[230px] w-full centerDiv shrink-0 mt-[10px]">
        <div className="h-full w-full max-w-[1050px]  flex flex-col items-center centerDiv">
          <div className="h-[200px] w-[90%] flex items-center p-2 bg-[#13603c] rounded-md addShadow md:p-3 lg:p-4">
            <img
              src="http://res.cloudinary.com/djgouef8q/image/upload/v1729306555/x0cbkdmxysxnmbmjxzrs.jpg"
              alt="advertisedImage"
              className="h-[90%] w-[85px] mr-2"
            />
            <div className="flex-1 shrink-0 flex flex-col p-1 pl-[5px] gap-2 md:gap-3 md:pl-[15px] lg:gap-4">
              <span className="text-[#f4f4f4] text-[0.85rem] opacity-85 addFont">
                beans and bite
              </span>
              <span className="text-[#f4f4f4] text-[1rem] addFont">
                Coffee At Home Collection
              </span>
              <span className="text-[#f4f4f4] text-[0.85rem] opacity-85 capitalize">
                a whole new expression of classic beans and bite coffee. now at
                your home
              </span>
              <span className="h-[40px] w-full flex md:pl-[0px]">
                <span className="h-full w-full flex">
                  <button
                    onClick={() => handleOrderCoffee()}
                    className="h-[35px] w-[100px] text-[#f4f4f4] text-[0.85rem] theamColor centerDiv rounded-3xl capitalize"
                  >
                    Order now
                  </button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full centerDiv">
        <div className="h-full w-full max-w-[1050px] flex flex-col">
          <div className="h-[60px] w-full flex items-center addFont text-[1rem] pl-[10px] sm:pl-[20px] md:pl-[50px]">
            Learn more about the world of coffee
          </div>
          <div className="flex-1 w-full flex flex-col gap-[20px] p-2 items-center justify-center md:flex-row md:justify-start md:items-start md:gap-[30px] ">
            {articleData.map((article) => (
              <div
                key={article.id}
                className="h-[150px] w-[280px] flex flex-row-reverse relative theamColor addShadow rounded-md md:ml-[50px]"
              >
                <img
                  src={article.image}
                  alt="ArtilceImage"
                  className="absolute top-[20%] left-[-14%] h-[80px] w-[120px] bg-cover rounded-md"
                />
                <div className="h-full w-[70%] bg-[#f4f4f4] flex flex-col">
                  <span className="h-auto w-full mt-[10px] font-bold baseColor text-[0.8rem] centerDiv">
                    Coffee Culture
                  </span>
                  <span className="h-auto w-full mt-[10px] font-bold addFont text-[0.95rem] text-center">
                    {article.tittle}
                  </span>
                  <span
                    onClick={() => handleViewArticle(article)}
                    className="h-auto w-full centerDiv flex gap-2 text-[0.8rem] addFont mt-[10px] underline baseColor cursor-pointer"
                  >
                    <img
                      src="http://res.cloudinary.com/djgouef8q/image/upload/v1724295399/hkijeoyi8l90co1j2yeu.png"
                      alt="logo"
                      className="h-[25px] w-[25px] object-cover"
                    />
                    View Article
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
