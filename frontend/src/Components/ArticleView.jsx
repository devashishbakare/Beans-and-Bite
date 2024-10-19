import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "./History";
import { addToHistory } from "../redux/slices/historySlice";
export const ArticleView = () => {
  const dispatch = useDispatch();
  const { extraData } = useSelector((state) => state.navbarSelection);
  const { history } = useSelector((state) => state.history);
  const articleInfo = extraData;
  console.log(extraData);
  useEffect(() => {
    const updateHistory = () => {
      let size = history.length;
      if (history[size - 1] != articleInfo.tittle) {
        dispatch(addToHistory({ sectionName: articleInfo.tittle }));
      }
    };
    updateHistory();
  }, []);
  return (
    <div className="h-full w-full centerDiv flex flex-col">
      <div className="h-auto w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px] theamColor">
          <History />
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col items-center overflow-y-scroll shrink-0">
        <div className="h-auto w-full max-w-[1050px] p-2  flex shrink-0">
          <span className="pl-[5px] font-gilroy-bold text-[1.3rem] tracking-tighter leading-[40.5px] text-left font-bold">
            {articleInfo.tittle}
          </span>
        </div>
        <div className="h-[300px] w-full max-w-[1050px] centerDiv flex flex-col shrink-0">
          <img
            src={articleInfo.image}
            alt="artilceViewImage"
            className="h-[98%] w-[98%] object-cover rounded-md"
          />
        </div>
        <div className="h-auto w-full max-w-[1050px] p-2 mb-[20px] pl-3">
          {articleInfo.coffeeArticle.map((data) => (
            <div className="h-auto w-full flex flex-col gap-[10px]">
              <span className="addFont mt-[10px]">{data[0]}</span>
              <span className="text-[0.85rem] opacity-85">{data[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
